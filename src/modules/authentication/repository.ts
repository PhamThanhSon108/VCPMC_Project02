import { rejects } from "assert";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export default function repository() {}
export const getProfile = async (email?: string) => {
  const emailCurrent =
    getAuth().currentUser?.email || "phamthanhson0111@gmail.com";
  if (emailCurrent) {
    const docRef = doc(db, "user", emailCurrent);
    const userQuery = query(
      collection(db, "user"),
      where("email", "==", emailCurrent)
    );
    const userQuerySnapshot = await getDocs(userQuery);
    const user: Array<any> | undefined = [];
    userQuerySnapshot.forEach((doc) => {
      user.push(doc.data());
    });
    return new Promise((resolve, rejects) => {
      if (user[0]) {
        resolve({ ...user[0] });
      } else rejects("Không tồn tại tài khoản");
    });
  }
};

export const updateProfile = async ({
  id,
  data,
}: {
  id: string;
  data: {
    phoneNumber: string;
    userFirstname: string;
    userLastname: string;
    birthday: string;
  };
}) => {
  return await updateDoc(doc(db, "user", id), {
    phoneNumber: data?.phoneNumber,
    userFirstname: data.userFirstname,
    userLastname: data.userLastname,
    birthday: data.birthday,
  });
};
