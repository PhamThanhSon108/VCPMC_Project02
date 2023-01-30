import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Badge, Input, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../shared/hooks";

export interface DataType {
  id: string;
  scheduleName: string;
  timePlay: string;
  orderNumber: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "Tên lịch",
    dataIndex: "scheduleName",
    key: "scheduleName",
  },
  {
    title: "Thời gian phát",
    dataIndex: "timePlay",
    key: "timePlay",
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
        Xem chi tiết
      </Link>
    ),
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
        Xóa
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
export default React.memo(function TableDefaultSchedule({
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
            orderNumber: 1,
            id: "12",
            scheduleName: "Lịch phát tháng 1",
            timePlay: " 12/01/2022-28/12/2022",
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
