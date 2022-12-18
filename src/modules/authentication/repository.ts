import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function repository() {}
export const getProfile = async (email?: string) => {
  const emailCurrent = getAuth().currentUser?.email;
  if (emailCurrent) {
    const docRef = doc(db, "users", emailCurrent);
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", emailCurrent)
    );
    const userQuerySnapshot = await getDocs(userQuery);
    const user: Array<any> | undefined = [];
    userQuerySnapshot.forEach((doc) => {
      user.push(doc.data());
    });

    const role:
      | Array<{
          deviceRole: string;
          serviceRole: string;
          provideNumber: string;
          managementRole: string;
        }>
      | any = [];
    const userRoleQuery = query(
      collection(db, "roles"),
      where("name", "==", user[0].role)
    );
    const userRoleQuerySnapshot = await getDocs(userRoleQuery);

    userRoleQuerySnapshot.forEach((doc) => {
      role.push(doc.data());
    });

    return {
      ...user[0],
      role: role[0],
      roleName: user[0].role,
    };
  }
};
