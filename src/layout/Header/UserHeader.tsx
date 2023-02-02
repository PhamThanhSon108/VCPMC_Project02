import { Avatar, Popover, Select, Skeleton, Typography } from "antd";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../shared/assets/images";
import { db } from "../../firebase/config";

import { updateProfileInStore } from "../../modules/authentication/profileStore";
import { getProfile } from "../../modules/authentication/repository";
import { getNotifies } from "../../modules/setting/userLog/respository";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import "./Header.scss";
export const formatDateInNotify = (seconds: number, exprire?: boolean) => {
  var d = new Date(seconds * 1000);
  var datestring = !exprire
    ? d.getHours() +
      ":" +
      d.getMinutes() +
      " ngày " +
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear()
    : "11" +
      ":" +
      "59" +
      " " +
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear();

  return datestring;
};
const ContentAnnoun = ({ notifies }: { notifies: Array<{}> | [] }) => {
  return (
    <div className="announ__wrap">
      <div className="announ-header">
        <span>THÔNG BÁO</span>
      </div>
      <div className="announ-body">
        <div className="announ-body-list">
          {notifies?.length > 0 ? (
            <>
              {notifies?.map((notify: any) => {
                return (
                  <div className="announ-body-item">
                    <div className="announ-body-item-user">
                      {notify?.userName}
                    </div>
                    <div className="announ-body-item-time">{notify?.log}</div>
                    <div className="announ-body-item-time">
                      Thời gian sử dụng:{" "}
                      {formatDateInNotify(notify?.createdAt?.seconds)}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="announ-body-item">
              <div className="announ-body-item-user">KHÔNG CÓ THÔNG BÁO</div>
              <div className="announ-body-item-time">
                Bạn chưa có bất kỳ thông báo nào!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default function UserHeader() {
  const navigate = useNavigate();
  const handleGotoProfile = () => {
    navigate("/profile");
  };
  const notifies = useAppSelector((state) => state.userLog.notifies);

  const user: any = useAppSelector((state) => state.profile.user);
  const dispatch = useAppDispatch();
  const avtUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDrvKyt1Je7fm-ENkI9exhhqnzD4MfBrhAHw&usqp=CAU";
  useEffect(() => {
    const q = query(collection(db, "userLogs"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      dispatch(getNotifies());
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (!user)
      getProfile().then((user) => {
        dispatch(updateProfileInStore({ user }));
      });
  }, []);
  return (
    <>
      <div
        className="userheader__wrap"
        style={{ paddingRight: "32px", height: "100%" }}
      >
        {/* <Popover
          placement="topRight"
          content={<ContentAnnoun notifies={notifies}></ContentAnnoun>}
          trigger="click"
        >
          <div className="bell">{images.icon.bell}</div>
        </Popover> */}
        <Select
          className="default-select"
          defaultValue="vn"
          style={{ width: 120 }}
          options={[
            {
              value: "vn",
              label: (
                <div style={{ width: "2500px" }}>
                  <span style={{ marginRight: "5px" }}>Việt Nam</span>

                  {images.icon.logoVietnamese}
                </div>
              ),
            },
            {
              value: "en",
              label: (
                <div>
                  <span style={{ marginRight: "5px" }}>Tiếng anh</span>

                  {images.icon.logoVietnamese}
                </div>
              ),
            },
          ]}
        />
        {user ? (
          <Avatar
            size={"large"}
            src={avtUrl}
            onClick={handleGotoProfile}
            className="userinfor"
          />
        ) : null}
        <span onClick={handleGotoProfile} className="userinfor">
          <Typography className="userinfor__wrapper">
            <div className="name">
              {user ? (
                user?.userFirstname + " " + user?.userLastname ||
                "Phạm Thanh Sơn"
              ) : (
                <div
                  style={{ marginTop: "1rem" }}
                  className="skeleton-group-avt"
                >
                  <Skeleton
                    avatar
                    active
                    paragraph={{ width: "7rem", rows: 1 }}
                    title={{ width: "150%" }}
                  />
                </div>
              )}
            </div>
            {user ? <div className="welcome red">{user?.roleName}</div> : null}
          </Typography>
        </span>
      </div>
    </>
  );
}
