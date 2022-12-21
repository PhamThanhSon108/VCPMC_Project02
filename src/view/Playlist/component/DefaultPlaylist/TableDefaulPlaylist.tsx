import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Badge, Input, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../shared/hooks";

export interface DataType {
  id: string;
  orderNumber: number;
  recordName: string;
  isrcCode: string;
  duration: string;
  singer: string;
  author: string;
  type: string;
  format: string;
  deviceService: string;
  useDuration: string;
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
    title: "Địa chỉ IP",
    dataIndex: "isrcCode",
    key: "isrcCode",
  },
  {
    title: "Thời lượng",
    dataIndex: "duration",
    key: "duration",
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
    title: "Thể loại",
    dataIndex: "type",
    key: "type",
  },

  {
    title: "Định dạng",
    dataIndex: "format",
    key: "format",
  },
  {
    title: "Định dạng",
    dataIndex: "useDuration",
    key: "useDuration",
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
        Cập nhật
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
export default React.memo(function TableDefaultPlaylist({
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
            id: "Text",
            orderNumber: 1,
            recordName: "Text",
            isrcCode: "Text",
            duration: "Text",
            singer: "Text",
            author: "Text",
            type: "Text",
            format: "Text",
            deviceService: "Text",
            useDuration: "Text",
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
            if (value && value > 0 && value < 100) {
              setTimeout(() => {
                console.log("loop");

                setNumbRowInPage(value);
              }, 3000);
            } else {
              setNumbRowInPage(13);
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
