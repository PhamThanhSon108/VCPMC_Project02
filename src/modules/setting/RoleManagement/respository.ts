import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { publicToast } from "../../../components/toast";
import { db } from "../../../firebase/config";

export const getRoles = createAsyncThunk("role/list", async () => {
  const roleDocs = await getDocs(collection(db, "roles"));
  const accountDocs = await getDocs(query(collection(db, "users")));

  let roles: any = [];
  let account: Array<{ role: string }> = [];
  let result: Array<object> = [];

  roleDocs.forEach((doc: object | any) => {
    if (doc.exists()) {
      roles.push(doc.data());
    }
  });
  accountDocs.forEach((doc: object | any) => {
    if (doc.exists()) {
      account.push(doc.data());
    }
  });

  roles.forEach((role: { name: string }) => {
    let numberOfLicensees = 0;

    account?.forEach((user) => {
      if (role.name === user.role) {
        numberOfLicensees++;
      }
    });
    result.push({ ...role, numberOfLicensees });
  });

  return result;
});

export const addRoleThunk = createAsyncThunk(
  "role/add",
  async (role: { name: string; navigate: any }) => {
    let roleExists: Array<undefined | object> = [];
    const roleExistsCollection = query(
      collection(db, "roles"),
      where("name", "==", role?.name)
    );

    const querySnapshot = await getDocs(roleExistsCollection);
    querySnapshot.forEach((doc) => {
      roleExists.push(doc.data());
    });
    if (roleExists.length > 0) {
      publicToast({
        type: "error",
        message: "Lỗi",
        description: "Đã tồn tại phân quyền",
      });
      return;
    }
    const id = v4();
    const docRole = doc(db, "roles", id);
    await setDoc(docRole, {
      ...role,
      id,
      updatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    });
    role.navigate("/setting/role");
    return true;
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({
    id,
    role,
    navigate,
  }: {
    id: string;
    role: {};
    navigate: NavigateFunction;
  }) => {
    const docRole = doc(db, "roles", id);

    await updateDoc(docRole, {
      ...role,
      updatedAt: Timestamp.now(),
    });
    navigate("/setting/role");
    return true;
  }
);

export const getRole = async (id: string) => {
  const docRole = doc(db, "roles", id);
  return await getDoc(docRole);
};
