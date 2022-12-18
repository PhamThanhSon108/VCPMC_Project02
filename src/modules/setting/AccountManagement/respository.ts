import { async } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  where,
  query,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { v4 } from "uuid";
import { auth, db } from "../../../firebase/config";

export const addAccount = async ({
  profile,
}: {
  profile?: { email: string; password: string };
}) => {
  try {
    let userExists: Array<undefined | object> = [];
    const userExistsCollection = query(
      collection(db, "users"),
      where("email", "==", profile?.email)
    );

    const querySnapshot = await getDocs(userExistsCollection);
    querySnapshot.forEach((doc) => {
      userExists.push(doc.data());
    });
    if (userExists.length > 0) return;
    if (profile?.email && profile?.password) {
      await createUserWithEmailAndPassword(
        auth,
        profile?.email,
        profile?.password
      );
      const id = v4();
      return await setDoc(doc(db, "users", id), {
        ...profile,
        id,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    return error;
  }
};

export const getAccounts = async () => {
  try {
    let users: Array<undefined | object> = [];
    const usersCollection = query(collection(db, "users"));

    const querySnapshot = await getDocs(usersCollection);
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  } catch (error) {
    return error;
  }
};

export const getDetailAccount = async ({ id }: { id: string }) => {
  try {
    const userDoc = doc(db, "users", id);
    const querySnapshot = await getDoc(userDoc);
    let user: object | undefined = querySnapshot.data();
    return user;
  } catch (error) {
    return error;
  }
};

export const updateAccount = async ({
  id,
  user,
}: {
  id: string;
  user: { email: string | undefined };
}) => {
  try {
    const userDoc = doc(db, "users", id);
    if (user) {
      if (user.email) {
        delete user.email;
      }
      return await updateDoc(userDoc, {
        id,
        ...user,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    return error;
  }
};
