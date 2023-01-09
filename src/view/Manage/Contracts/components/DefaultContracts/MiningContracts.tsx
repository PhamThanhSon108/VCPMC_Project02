import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Badge, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../shared/hooks";

export interface DataType {
  id: string;
  orderNumber: number;
  recordName: string;
  isrcCode: string;

  singer: string;
  author: string;
  statusApproval: "approved" | "new" | "denied";
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
  },
  {
    title: "Mã ISRC",
    dataIndex: "isrcCode",
    key: "isrcCode",
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
    title: "Ngày tải",
    dataIndex: "uploadDate",
    key: "uploadDate",
  },
  {
    title: "Tình trạng",
    dataIndex: "statusApproval",
    key: "statusApproval",
    render: (_, { statusApproval }) => {
      switch (statusApproval) {
        case "approved":
          return (
            <Badge
              text={<span style={{ color: "white" }}>Đã được phê duyệt</span>}
              status="processing"
            />
          );
        case "denied":
          return (
            <Badge
              text={<span style={{ color: "white" }}>Bị từ chối</span>}
              status="error"
            />
          );
        default:
          return (
            <Badge
              text={<span style={{ color: "white" }}>Mới</span>}
              status="success"
            />
          );
      }
    },
  },
  {
    render: (_, { id }) => (
      <Link
        to={"/schedule/detail/123"}
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
export default React.memo(function TableAuthorisations({
  statusActive,
  statusConect,
  keyWord,
}: {
  statusActive: "active" | "inactive" | "all";
  statusConect: "conected" | "fail" | "all";
  keyWord: string | undefined;
}) {
  const devices = useAppSelector((state) => state.device);
  let data: DataType[] | any = devices.devices;
  const [numbRowInPage, setNumbRowInPage] = useState<number>(13);
  return (
    <>
      <Table
        loading={devices.loading}
        className="table-custom"
        columns={columns}
        dataSource={[
          {
            id: "String",
            orderNumber: 1,
            recordName: "Nước ngoài",
            isrcCode: "KRA40105463",
            statusApproval: "approved",
            singer: "Phan Mạnh Quỳnh",
            author: "Phan Mạnh Quỳnh",
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
    </>
  );
});
