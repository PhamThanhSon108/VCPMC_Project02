import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const getUserLogs = createAsyncThunk("userLog/list", async () => {
  const userLogDocs = await getDocs(collection(db, "userLogs"));
  let result: any = [];
  userLogDocs.forEach((doc: object | any) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.exists()) {
      result.push(doc.data());
    }
  });
  return result;
});

export const getNotifies = createAsyncThunk("notify/list", async () => {
  const queryNotifies = query(
    collection(db, "userLogs"),
    orderBy("createdAt", "desc")
  );
  const docs = await getDocs(queryNotifies);
  const currentEmail = getAuth().currentUser?.email;
  let result: any = [];
  docs.forEach((doc: object | any) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.exists() && currentEmail !== doc.data()?.userEmail) {
      result.push(doc.data());
    }
  });
  return result;
});
