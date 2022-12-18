import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Badge, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../shared/hooks";

interface DataType {
  ordinalNumbers: string;
  statusCreateNumbers: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Số thứ tự",
    dataIndex: "ordinalNumbers",
    key: "ordinalNumbers",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Trạng thái",
    key: "statusCreateNumbers",
    dataIndex: "statusCreateNumbers",
    render: (_, { statusCreateNumbers }) => {
      return (
        <>
          {statusCreateNumbers === "waiting" ? (
            <Badge status="success" text="Đang chờ" />
          ) : (
            <Badge status="error" text="Đã sử dụng" />
          )}
        </>
      );
    },
  },
];

let data: DataType[] | any = [
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
  },
  {
    id: "KOI_01",
    name: "Kiosk",
    ipAddress: "192.168.1.10",
    statusActive: "active",
    statusConect: "conected",
    serviceUse: "Khám tim mạch khám mắt",
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
export default function TableCreateNumbers() {
  //   const devices = useAppSelector((state) => state.device.devices);
  //   data = devices;
  const numbers = useAppSelector(
    (state) => state.service.numbersProvidedbyService
  );
  moment.defaultFormat = "DD.MM.YYYY HH:mm";
  data = numbers.map((item: any) => {
    return {
      ordinalNumbers: item?.service?.option?.preFix
        ? item?.ordinalNumbers + item?.service?.serviceId
        : item?.service?.serviceId + item?.ordinalNumbers,

      statusCreateNumbers: "waiting",
    };
  });

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
