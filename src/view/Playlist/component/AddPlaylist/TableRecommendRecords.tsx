import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Badge, Input, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../shared/hooks";

export interface DataType {
  key: React.Key;
  id: string;
  orderNumber: number;
  recordName: string;
  isrcCode: string;
  duration: string;
  singer: string;
  author: string;
  type: string;
  format: string;

  useDuration: string;
  contractNumber: string;
  uploadDate: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "Tên bản ghi",
    dataIndex: "recordName",
    key: "recordName",
    render: (_, { recordName, type, format, duration }) => {
      return (
        <div>
          <div>{recordName}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "10px",
              opacity: "0.7",
            }}
          >
            <span>{type}</span>
            <span
              style={{
                color: "#347AFF",
                lineHeight: "10px",
                padding: "0px 2px",
              }}
            >
              *
            </span>

            <span>{format}</span>
            <span
              style={{
                color: "#347AFF",
                lineHeight: "10px",
                padding: "0px 2px",
              }}
            >
              *
            </span>

            <span>{duration}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: "Ca sĩ",
    dataIndex: "singer",
    key: "singer",
  },

  {
    title: "Tác giả",
    dataIndex: "author",
    key: "author",
  },

  {
    render: (_, { id }) => (
      <Link
        to={id}
        style={{
          textAlign: "center",
          color: " #FF7506",
          textDecoration: "underline",
        }}
      >
        Nghe
      </Link>
    ),
  },

  {
    render: (_, { id }) => (
      <Link
        to={id}
        style={{
          textAlign: "center",
          color: " #FF7506",
          textDecoration: "underline",
        }}
      >
        Thêm
      </Link>
    ),
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
export default React.memo(function TableRecommendRecords() {
  const devices = useAppSelector((state) => state.device);
  let data: DataType[] | any = devices.devices;
  const [numbRowInPage, setNumbRowInPage] = useState<number>(13);
  return (
    <div style={{ position: "relative" }}>
      <Table
        className="table-custom"
        columns={columns}
        onChange={function (selectedRowKeys, selectedRows, info) {
          console.log(selectedRowKeys, selectedRows, info);
        }}
        dataSource={[
          {
            key: "0122",
            id: "String",
            orderNumber: 1,
            recordName: "Nước ngoài",
            isrcCode: "KRA40105463",
            duration: "3:40",
            singer: "Phan Mạnh Quỳnh",
            author: "Phan Mạnh Quỳnh",
            type: "String",
            format: "String",

            useDuration: "String",
            contractNumber: "AAKRA40105",
            uploadDate: "22/12/2022 12:12:00",
          },
          {
            key: "0122",
            id: "String",
            orderNumber: 1,
            recordName: "Nước ngoài",
            isrcCode: "KRA40105463",
            duration: "3:40",
            singer: "Phan Mạnh Quỳnh",
            author: "Phan Mạnh Quỳnh",
            type: "String",
            format: "String",

            useDuration: "String",
            contractNumber: "AAKRA40105",
            uploadDate: "22/12/2022 12:12:00",
          },
          {
            key: "0122",
            id: "String",
            orderNumber: 1,
            recordName: "Nước ngoài",
            isrcCode: "KRA40105463",
            duration: "3:40",
            singer: "Phan Mạnh Quỳnh",
            author: "Phan Mạnh Quỳnh",
            type: "String",
            format: "String",

            useDuration: "String",
            contractNumber: "AAKRA40105",
            uploadDate: "22/12/2022 12:12:00",
          },
        ]}
        size={"middle"}
        pagination={{
          pageSize: numbRowInPage,
          itemRender: itemRender,
        }}
        bordered
      />
      <div className="display-row-in__page-wrap">
        <span className="display-row-in__page-wrap-text">Hiển thị</span>
        <InputNumber
          className="display-row-in__page-wrap-input"
          value={numbRowInPage}
          type="number"
          onChange={(value) => {
            if (value && value > 0) {
              setTimeout(() => {
                console.log("loop");

                setNumbRowInPage(value);
              }, 3000);
            }
          }}
        />
        <span className="display-row-in__page-wrap-text">
          hàng trong mỗi trang
        </span>
      </div>
    </div>
  );
});
