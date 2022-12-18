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
  name: string;
  numberOfLicensees: number;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên vai trò",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Số người dùng",
    dataIndex: "numberOfLicensees",
    key: "numberOfLicensees",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    render: (_, { id }) => {
      return (
        <>
          <Link to={`update/${id}`}>Cập nhật</Link>
        </>
      );
    },
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
export default function TableRoleManegement() {
  const roleSelector = useAppSelector((state) => state.role);
  return (
    <Table
      loading={roleSelector.loading}
      className="table__device"
      columns={columns}
      dataSource={roleSelector.roles}
      size={"middle"}
      pagination={{
        pageSize: 9,
        itemRender: itemRender,
      }}
      bordered
    />
  );
}
