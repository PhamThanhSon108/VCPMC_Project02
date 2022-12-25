import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Badge, Input, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../shared/hooks";

export interface DataType {
  id: string;
  orderNumber: number;
  duration: string;
  numberRecords: string;
  playlistName: string;
  subjects: string[];
  uploadDate: string;
  createdBy: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "Tiêu đề",
    dataIndex: "playlistName",
    key: "playlistName",
  },
  {
    title: "Số lượng bản ghi",
    dataIndex: "numberRecords",
    key: "numberRecords",
  },
  {
    title: "Thời lượng",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Chủ đề",

    key: "subjects",
    render: (_, { subjects }) => {
      if (subjects.length >= 5) {
        subjects = subjects.slice(0, 5);
        subjects.push("...");
      }
      const newSubjects = subjects.map((value) => {
        return <span className="tag-box-inside-table">{value}</span>;
      });
      return newSubjects;
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "uploadDate",
    key: "uploadDate",
  },
  {
    title: "Người tạo",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    render: (_, { id }) => (
      <Link
        to={"/playlist/detail/123"}
        style={{
          textAlign: "center",
          color: " #FF7506",
          textDecoration: "underline",
        }}
      >
        Chi tiết
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
            id: "12",
            orderNumber: 15,
            duration: "01:50:30",
            numberRecords: "30",
            playlistName: "Khúc hát 2022",
            subjects: ["Pop", "Ballad", "Dingga", "Lofi", "Rock", "Bolero"],
            uploadDate: "23/12/2022",
            createdBy: "Phạm Thanh Sơn",
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
