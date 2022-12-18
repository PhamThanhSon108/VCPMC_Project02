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
import { useAppSelector } from "../../../../shared/hooks";

interface DataType {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceDescription: string;
  serviceStatusActive: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã dịch vụ",
    dataIndex: "serviceId",
    key: "serviceId",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Mô tả",
    dataIndex: "serviceDescription",
    key: "serviceDescription",
  },
  {
    title: "Trạng thái hoạt động",
    key: "serviceActiveStatus",
    dataIndex: "serviceActiveStatus",
    render: (_, { serviceStatusActive }) => {
      return (
        <>
          {serviceStatusActive === "active" ? (
            <Badge status="success" text="Đang hoạt động" />
          ) : (
            <Badge status="error" text="Ngưng hoạt động" />
          )}
        </>
      );
    },
  },

  {
    key: "detail",
    render: (_, { id }) => (
      <Link
        to={`/service/detail/${id}`}
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#4277FF",
          textDecoration: "underline",
        }}
      >
        Chi tiết
      </Link>
    ),
  },
  {
    key: "update",
    render: (_, { id }) => (
      <Link
        to={`/service/update/${id}`}
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
    id: "201",
    serviceId: "201",
    serviceName: "Khám tim mạch",
    serviceStatusActive: "active",
    serviceDescription: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    serviceId: "KOI_01",
    serviceName: "Kiosk",
    serviceStatusActive: "active",
    serviceDescription: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    serviceId: "KOI_01",
    serviceName: "Kiosk",
    serviceStatusActive: "active",
    serviceDescription: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    serviceId: "KOI_01",
    serviceName: "Kiosk",
    serviceStatusActive: "active",
    serviceDescription: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    serviceId: "KOI_01",
    serviceName: "Kiosk",
    serviceStatusActive: "active",
    serviceDescription: "Khám tim mạch khám mắt",
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
export default function ServiceTable() {
  const services = useAppSelector((state) => state.service.services);
  data = services;
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
