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
import { ExportCSV } from "../Excel/ExportCSV";

interface DataType {
  id: string;
  ordinalNumbers: string;
  customerName: string;
  serviceName: string;
  createdTime: string;
  expiredTime: string;
  statusCreateNumbers: string;
  supplySource: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Số thứ tự",
    dataIndex: "ordinalNumbers",
    key: "ordinalNumbers",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Tên dịch vụ",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "createdTime",
    key: "createdTime",
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
  {
    title: "Nguồn cấp",
    dataIndex: "supplySource",
    key: "supplySource",
  },
];

let data: DataType[] | any = [
  {
    ordinalNumbers: 2010001,
    customerName: "Nguyễn Thị Hoa",
    serviceName: "Khám tim mạch",
    createdTime: "13:40 15/02/2022",
    expiredTime: "13:40 16/02/2022",
    statusCreateNumbers: "waiting",
    supplySource: "Kiosk",
  },
  {
    ordinalNumbers: 2010001,
    customerName: "Nguyễn Thị Hoa",
    serviceName: "Khám tim mạch",
    createdTime: "13:40 15/02/2022",
    expiredTime: "13:40 16/02/2022",
    statusCreateNumbers: "waiting",
    supplySource: "Kiosk",
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
export const formatDate = (seconds: number, exprire?: boolean) => {
  var d = new Date(seconds * 1000);

  var datestring = !exprire
    ? d.getHours() +
      ":" +
      d.getMinutes() +
      " " +
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
export default function TableReport() {
  const numbers = useAppSelector(
    (state) => state.provideNumbers.provideNumbers
  );
  moment.defaultFormat = "DD.MM.YYYY HH:mm";
  data = numbers.map((item: any) => {
    return {
      id: item?.id,
      ordinalNumbers: item?.service?.option?.preFix
        ? item?.ordinalNumbers + item?.service?.serviceId
        : item?.service?.serviceId + item?.ordinalNumbers,
      customerName: item?.customerName,
      serviceName: item?.service?.serviceName,
      createdTime: formatDate(item?.createdAt.seconds),
      expiredTime: formatDate(item?.createdAt.seconds, true),
      statusCreateNumbers: "waiting",
      supplySource: item?.device?.deviceName,
    };
  });

  return (
    <>
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
    </>
  );
}
