import { Button, Menu } from "antd";
import { signOut } from "firebase/auth";
import { MenuProps } from "rc-menu";
import { SelectInfo } from "rc-menu/lib/interface";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { images } from "../../shared/assets/images";
import { auth } from "../../firebase/config";
import { useAppDispatch } from "../../shared/hooks";
import { setToken } from "../../modules/authentication/profileStore";
import "./Sidebar.scss";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Kho bản ghi", "/", images.icon.recordStore),
  getItem("Playlist", "/device", images.icon.playlist),
  getItem("Lập lịch phát", "/service", images.icon.schedule),
  getItem(`Quản lý`, "/setting0", images.icon.manage, [
    getItem("Quản lý hợp đồng", "/setting/role"),
    getItem("Quản lý thiết bị", "/setting/account"),
    getItem("Đơn vị ủy quyền", "/setting/userlog"),
    getItem("Đơn vị sử dụng", "/setting/userlog"),
  ]),
  getItem(`Doanh thu`, "/setting8", images.icon.setting, [
    getItem("Báo cáo doanh thu", "/setting/role"),
    getItem("Lịch sử đối soát", "/setting/account"),
    getItem("Phân phối doanh thu", "/setting/userlog"),
  ]),
  getItem(`Cài đặt`, "/setting1", images.icon.setting, [
    getItem("Phân quyền người dùng", "/setting/role"),
    getItem("Cấu hình", "/setting/account"),
    getItem("Quản lý hợp đồng", "/setting/userlog"),
    getItem("Thông tin tác phẩm", "/setting/userlog"),
    getItem("Chu kỳ đối soát", "/setting/userlog"),
  ]),
  getItem(`Hỗ trợ`, "/setting2", images.icon.setting, [
    getItem("Hướng dẫn sử dụng", "/setting/role"),
    getItem("Tải app", "/setting/account"),
    getItem("Feedback", "/setting/userlog"),
  ]),
];
export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleOnselect = (item: SelectInfo) => {
    navigate(`${item.key}`);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh)",
        width: "100%",
      }}
      className={"sidebar-container"}
    >
      <div className="logo">
        <img src={images.logo} />
      </div>

      <Menu
        className="menu"
        items={items}
        selectedKeys={[location.pathname]}
        onSelect={(item) => {
          handleOnselect(item);
        }}
      />
      {/* <div className="btn__logout">
        <Button
          icon={images.icon.logout}
          onClick={() => {
            signOut(auth).then(() => {
              dispatch(setToken({ token: "", remember: false }));
              document.cookie = `accessToken=; SameSite=None; Secure`;

              navigate("/login");
            });
          }}
        >
          Đăng xuất
        </Button>
      </div> */}
    </div>
  );
}
