import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  UserCredential,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";

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

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  email = email.toLocaleLowerCase().trim();
  const userQuery = query(collection(db, "user"), where("email", "==", email));
  const userQuerySnapshot = await getDocs(userQuery);
  let user: Array<any> | undefined = [];
  userQuerySnapshot.forEach((doc) => {
    user?.push(doc.data());
  });
  if (user?.length === 0) {
    return Promise.reject("Tài khoản không tồn tại!");
  }
  await signInWithEmailAndPassword(auth, email, password)
    .then((user: any) => {
      console.log(user, user?.user.accessToken, "user");

      localStorage.setItem("auth-token", user?.user.accessToken);
      return Promise.resolve(user);
    })
    .catch((err) => {
      return Promise.reject("Thông tin đăng nhập không đúng!");
    });
};

export const logout = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem("auth-token");
      Promise.resolve("Đăng xuất thành công");
    })
    .catch(() => {
      Promise.reject("Có lỗi khi thực hiện đăng xuất");
    });
};

export const logOut = createAsyncThunk("auth/logout", async () => {
  await signOut(auth)
    .then(() => {
      Promise.resolve("Đăng xuất thành công");
    })
    .catch(() => {
      Promise.reject("Có lỗi khi thực hiện đăng xuất");
    });
});

export const changePassWord = async ({
  currentPass,
  newPass,
}: {
  currentPass: string;
  newPass: string;
}): Promise<any | { code: string; message: string }> => {
  const user = auth?.currentUser;
  if (user?.email && user) {
    await signInWithEmailAndPassword(auth, user.email, currentPass)
      .catch(() => {
        return Promise.reject({
          code: "401",
          message: "Mật khẩu hiện tại không đúng!",
        });
      })
      .then(() => {
        updatePassword(user, newPass)
          .then(() => {
            return Promise.resolve({
              code: "200",
              message: "Cập nhật mật khẩu thành công!",
            });
          })
          .catch((error) => {
            return Promise.reject({
              code: "401",
              message: "Có lỗi xảy ra!",
            });
          });
      });
  } else {
    return Promise.reject({
      code: "401",
      message: "Phiên đăng nhập đã hết hạn!",
    });
  }
};
