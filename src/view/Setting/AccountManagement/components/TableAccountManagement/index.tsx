import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Badge, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../shared/hooks";
const labelFormAccount = {
  userFullname: {
    label: "Họ tên",
  },
  phoneNumber: {
    label: "Số điện thoại",
  },
  email: {
    label: "Email",
  },
  role: {
    label: "Vai trò",
  },
  userName: {
    label: "Tên đăng nhập",
  },
  password: {
    label: "Mật khẩu",
  },
  confirmPassword: {
    label: "Nhập lại mật khẩu",
  },
  status: {
    label: "Tình trạng",
  },
};
interface DataType {
  id: string;
  userFullname: string;
  phoneNumber: string;
  email: string;
  role: string;
  userName: string;
  password: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: labelFormAccount.userName.label,
    dataIndex: "userName",
    key: "userName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: labelFormAccount.userFullname.label,
    dataIndex: "userFullname",
    key: "userFullname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: labelFormAccount.phoneNumber.label,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: labelFormAccount.email.label,
    dataIndex: "email",
    key: "email",
  },
  {
    title: labelFormAccount.role.label,
    dataIndex: "role",
    key: "role",
  },
  {
    title: labelFormAccount.status.label,
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      return (
        <>
          {status === "active" ? (
            <Badge status="success" text="Đang hoạt động" />
          ) : (
            <Badge status="error" text="Ngưng hoạt động" />
          )}
        </>
      );
    },
  },

  {
    key: "update",
    render: (_, { id }) => (
      <Link
        to={`update/${id}`}
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#4277FF",
          textDecoration: "underline",
        }}
      >
        Cập nhật
      </Link>
    ),
  },
];

let data: DataType[] | any = [
  {
    id: 123,
    userFullname: "Phạm Thanh Sơn",
    phoneNumber: "0222154689",
    email: "phamthanhson011@gmail.com",
    role: "Admin",
    userName: "phamson",
    password: "12345",
    status: "active",
  },
  {
    id: 123,
    userFullname: "Phạm Thanh Sơn",
    phoneNumber: "0222154689",
    email: "phamthanhson011@gmail.com",
    role: "Admin",
    userName: "phamson",
    password: "12345",
    status: "active",
  },
  {
    id: 123,
    userFullname: "Phạm Thanh Sơn",
    phoneNumber: "0222154689",
    email: "phamthanhson011@gmail.com",
    role: "Admin",
    userName: "phamson",
    password: "12345",
    status: "active",
  },
  {
    id: 123,
    userFullname: "Phạm Thanh Sơn",
    phoneNumber: "0222154689",
    email: "phamthanhson011@gmail.com",
    role: "Admin",
    userName: "phamson",
    password: "12345",
    status: "active",
  },
  {
    id: 123,
    userFullname: "Phạm Thanh Sơn",
    phoneNumber: "0222154689",
    email: "phamthanhson011@gmail.com",
    role: "Admin",
    userName: "phamson",
    password: "12345",
    status: "active",
  },
  {
    id: 123,
    userFullname: "Phạm Thanh Sơn",
    phoneNumber: "0222154689",
    email: "phamthanhson011@gmail.com",
    role: "Admin",
    userName: "phamson",
    password: "12345",
    status: "active",
  },
  {
    id: 123,
    userFullname: "Phạm Thanh Sơn",
    phoneNumber: "0222154689",
    email: "phamthanhson011@gmail.com",
    role: "Admin",
    userName: "phamson",
    password: "12345",
    status: "active",
  },
];
const itemRender = (_: any, type: string, originalElement: ReactNode) => {
  if (type === "prev") {
    return (
      <>
        <CaretLeftOutlined />
      </>
    );
  }
  if (type === "next") {
    return <CaretRightOutlined />;
  }
  return originalElement;
};
export default function TableAccountManagement() {
  const accounts: Array<any> | undefined = useAppSelector((state) => {
    return state.account.accounts;
  });
  data = accounts;
  return (
    <Table
      className="table__device"
      columns={columns}
      dataSource={data}
      size={"middle"}
      pagination={{
        pageSize: 9,
        itemRender: itemRender,
      }}
      bordered
    />
  );
}
