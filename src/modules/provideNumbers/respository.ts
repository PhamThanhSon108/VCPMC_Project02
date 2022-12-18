import { async } from "@firebase/util";

import {
  query,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  where,
  updateDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../../firebase/config";

export const provideNumber = async ({ id }: { id: string }) => {
  //get service with current id
  const serviceRef = doc(db, "services", id);
  const serviceSnap = await getDoc(serviceRef);
  const currentService = serviceSnap.data();
  //get devices use service with id of service
  const deviceRef = collection(db, "devices");
  const deviceQuery = query(
    deviceRef,
    where("deviceService", "array-contains", id)
  );
  const deviceDocs = await getDocs(deviceQuery);
  const devices: any = [];
  deviceDocs.forEach((item) => {
    devices.push(item.data());
  });
  if (devices.length === 0) return;
  //get pre ordinalNumbers to create new number with option of service current
  let newOrdinalNumbers: number | string = 1;
  if (currentService?.OrdinalNumbers !== undefined) {
    newOrdinalNumbers = currentService?.OrdinalNumbers + 1;
  }
  //pass
  if (currentService?.autoIncrease) {
    if (newOrdinalNumbers > 9999) {
      newOrdinalNumbers = 1;
    }
  }
  if (
    currentService?.day &&
    currentService?.day !== "today" &&
    currentService?.resetEveryday === true
  ) {
    newOrdinalNumbers = 1;
  }

  if (newOrdinalNumbers.toString().length === 1) {
    newOrdinalNumbers = "000" + newOrdinalNumbers;
  }
  if (newOrdinalNumbers.toString().length === 2) {
    newOrdinalNumbers = "00" + newOrdinalNumbers;
  }
  if (newOrdinalNumbers.toString().length === 3) {
    newOrdinalNumbers = "0" + newOrdinalNumbers;
  }

  const orderNumber = {
    id: v4(),
    ordinalNumbers: newOrdinalNumbers,
    customerName: "Pham Thanh Son",
    service: {
      id: currentService?.id,
      serviceId: currentService?.serviceId,
      serviceName: currentService?.serviceName,
      option: {
        preFix: currentService?.preFix || null,
        resetEveryday: currentService?.resetEveryday,
      },
    },
    device: {
      deviceName: devices[0]?.deviceName,
      deviceId: devices[0]?.deviceId,
      id: devices[0]?.id,
    },
    createdAt: Timestamp.now(),
    statusCreateNumbers: "waiting",
  };
  await setDoc(doc(db, "provideNumbers", orderNumber.id), orderNumber);
  await updateDoc(doc(db, "services", currentService?.id), {
    OrdinalNumbers: Number(newOrdinalNumbers),
  });
  return orderNumber;
};

export const getProvideNumbers = async () => {
  let numbers: Array<undefined | object> = [];
  const provideNumbersCollection = query(
    collection(db, "provideNumbers"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(provideNumbersCollection);

  querySnapshot.forEach((doc) => {
    numbers.push(doc.data());
  });
  return numbers;
};
