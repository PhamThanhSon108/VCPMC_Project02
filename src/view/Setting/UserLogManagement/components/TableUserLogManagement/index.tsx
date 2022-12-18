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

interface DataType {
  id: string;
  userName: string;
  createdTime: string;
  ipAddress: string;
  manipulation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên đăng nhập",
    dataIndex: "userName",
    key: "userName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Thời gian tác động",
    dataIndex: "createdTime",
    key: "createdTime",
  },
  {
    title: "IP thực hiện",
    dataIndex: "ipAddress",
    key: "ipAddress",
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "log",
    key: "log",
  },
];

let data: DataType[] = [];
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
export default function TableUserLogManegement() {
  const userLogs = useAppSelector((state) => state.userLog.userLogs);
  return (
    <Table
      className="table__device"
      columns={columns}
      dataSource={userLogs || data}
      size={"middle"}
      pagination={{
        pageSize: 9,
        itemRender: itemRender,
      }}
      bordered
    />
  );
}
