import { message } from "antd";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { db, storage } from "../../firebase/config";
type contractType = "authorisation" | "mining";
export default function repository() {}
export const getContractsAsync = async ({
  typeContract,
}: {
  typeContract: contractType;
}) => {
  const colRef = query(
    collection(db, "contracts"),
    where("type", "==", typeContract)
  );
  const contractsQuerySnapshot = await getDocs(colRef);
  const contracts: Array<any> | undefined = [];
  contractsQuerySnapshot.forEach((doc) => {
    contracts.push(doc.data());
  });
  return new Promise((resolve, rejects) => {
    if (contracts.length > 0) {
      resolve(
        contracts.sort(
          (a: any, b: any) => b.updatedAt.seconds - a.updatedAt.seconds
        )
      );
    } else rejects("Không có hợp đồng nào được tìm thấy");
  });
};

export const getContractAsync = async ({ id }: { id: string }) => {
  const docRef = doc(db, "contracts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data(), "docdata");
    let file = null;
    if (docSnap.data()?.fileId) {
      await getDownloadURL(
        ref(storage, `contracts/${docSnap.data()?.fileId}.doc`)
      )
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          file = url;
          console.log(url, "url");

          // This can be downloaded directly:
        })
        .catch((error) => {
          // Handle any errors
          Promise.reject({
            code: 400,
            message: "Có lỗi xong quá trình xử lý",
          });
        });
    }
    return Promise.resolve(Object.assign({ fileURL: file }, docSnap.data()));
    // return Promise.resolve(docSnap.data());
  } else {
    return Promise.reject({
      code: 400,
      message: "Không tìm thấy thông tin của hợp đồng",
    });
  }
};

export const createContract = async ({
  contract,
  type,
}: {
  contract: any;
  type: contractType;
}) => {
  const fileId = v4();
  const id = v4();
  console.log(contract, "contract log");

  if (contract?.file) {
    const storageRef = ref(storage, `contracts/${fileId}.doc`);
    await uploadBytes(storageRef, contract?.file).catch((snapshot) => {
      return Promise.reject({
        code: "400",
        message: "Có lỗi trong quá trình tải tệp",
      });
    });
  }

  let finalContract = {
    type: type,
    id: id,
    fileId: contract?.file ? fileId : null,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    ownership: {
      copyRight: contract?.copyRight || 0,
      performersRight: contract?.performersRight || 50,
      executiveRight: contract?.executiveRight || 50,
    },
    contractNumber: contract?.contractNumber,
    contractName: contract?.contractName,
    effectiveDate: contract?.effectiveDate?.toDate(),
    expirationDate: contract?.expirationDate?.toDate(),
    authorisedPerson: {
      name: contract?.name,
      gender: contract?.gender,
      unit: contract?.unit || null,
      birthday: contract?.birthday?.toDate(),
      phone: contract?.phone,
      citizenship: contract?.citizenship,
      identificationNumber: contract?.identificationNumber,
      issueDate: contract.issueDate?.toDate(),
      placeOfIssue: contract?.placeOfIssue,
      taxCode: contract?.taxCode || null,
      residence: contract?.residence || null,
      email: contract?.email,
      numberedAccount: contract?.numberedAccount || null,
      password: contract.password,
      bank: contract?.bank || null,
    },
  };
  const createContract = setDoc(doc(db, "contracts", id), finalContract);
  return await createContract;
};

export const updateContract = async ({
  id,
  contract,
  type,
}: {
  id: string;
  contract: any;
  type: contractType;
}) => {
  const fileId = v4();
  console.log(contract, "contract log");

  if (contract?.file) {
    const storageRef = ref(storage, `contracts/${fileId}.doc`);
    await uploadBytes(storageRef, contract?.file).catch((snapshot) => {
      return Promise.reject({
        code: "400",
        message: "Có lỗi trong quá trình tải tệp",
      });
    });
  }

  let finalContract: any = {
    updatedAt: Timestamp.now(),
    contractNumber: contract?.contractNumber,
    contractName: contract?.contractName,
    effectiveDate: contract?.effectiveDate?.toDate(),
    expirationDate: contract?.expirationDate?.toDate(),
    authorisedPerson: {
      name: contract?.name,
      gender: contract?.gender,
      unit: contract?.unit || null,
      birthday: contract?.birthday?.toDate(),
      phone: contract?.phone,
      citizenship: contract?.citizenship,
      identificationNumber: contract?.identificationNumber,
      issueDate: contract.issueDate?.toDate(),
      placeOfIssue: contract?.placeOfIssue,
      taxCode: contract?.taxCode || null,
      residence: contract?.residence || null,
      email: contract?.email,
      numberedAccount: contract?.numberedAccount || null,
      password: contract.password,
      bank: contract?.bank || null,
    },
  };
  if (contract?.file) {
    finalContract[fileId] = fileId;
  }
  const updateContract = updateDoc(doc(db, "contracts", id), finalContract);
  return await updateContract;
};

export const extendContract = async ({
  id,
  contract,
}: {
  id: string;
  contract: any;
}) => {
  const fileId = v4();
  const currentContract = (await getDoc(doc(db, "contracts", id))).data();
  if (contract?.file) {
    const storageRef = ref(storage, `contracts/${fileId}.doc`);
    await uploadBytes(storageRef, contract?.file).catch((snapshot) => {
      return Promise.reject({
        code: "400",
        message: "Có lỗi trong quá trình tải tệp",
      });
    });
  }

  //Extend contract is shown by a list date
  const timeExtendContracts =
    currentContract?.timeExtendContracts?.length > 0
      ? [
          ...currentContract?.timeExtendContracts,
          contract?.expirationDate.toDate(),
        ]
      : [contract?.expirationDate.toDate()];

  let finalContract: any = {
    updatedAt: Timestamp.now(),
    timeExtendContracts: timeExtendContracts,
    expirationDate: contract?.expirationDate?.toDate(),
  };

  if (contract?.file) {
    finalContract.file = fileId;
  }

  if (
    contract?.copyRight ||
    contract?.performersRight ||
    contract?.executiveRight
  ) {
    finalContract.ownership = {
      copyRight: contract?.copyRight,
      performersRight: contract?.performersRight,
      executiveRight: contract?.executiveRight,
    };
  }
  const updateContract = updateDoc(doc(db, "contracts", id), finalContract);
  return await updateContract;
};

export const cancelContractAsync = async ({
  id,
  reason,
}: {
  id: string;
  reason: string;
}) => {
  let finalContract: any = {
    updatedAt: Timestamp.now(),
    reasonCancelContract: reason,
  };
  const updateContract = updateDoc(doc(db, "contracts", id), finalContract);
  return await updateContract;
};
