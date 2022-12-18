import { async } from "@firebase/util";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  where,
  query,
  updateDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { writeLog } from "../device/respository";
export const getServices = async () => {
  let services: Array<undefined | object> = [];
  const q = query(
    collection(db, "services"),

    orderBy("serviceId", "desc")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    services.push(doc.data());
  });
  return services;
};

export const addService = async ({
  service,
  id,
}: {
  service: object;
  id: string;
}) => {
  writeLog({ log: "Thêm dịch vụ" });
  return setDoc(doc(db, "services", id), {
    ...service,
    id,
    serviceStatusActive: "active",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
};

export const updateService = async ({
  service,
  id,
}: {
  service: object;
  id: string;
}) => {
  writeLog({ log: "Điều chỉnh dịch vụ" });

  return updateDoc(doc(db, "services", id), {
    ...service,
    id,
    updatedAt: Timestamp.now(),
  });
};

export const getNumbersProvidedbyService = async ({
  id,
}: {
  id: string | undefined;
}) => {
  let numbers: Array<undefined | object> = [];
  const provideNumbersCollection = query(
    collection(db, "provideNumbers"),
    where("service.id", "==", id)
    // orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(provideNumbersCollection);
  querySnapshot.forEach((doc) => {
    numbers.push(doc.data());
  });
  return numbers;
};
