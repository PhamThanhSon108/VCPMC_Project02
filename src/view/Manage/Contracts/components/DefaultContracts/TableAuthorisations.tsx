import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../shared/hooks";

export interface DataType {
  id: string;
  orderNumber: number;
  idContract: string;
  contractName: string;
  authorizer: string;
  proprietaryRight: string;
  contractualEffect: string;
  creationDate: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "Số hợp đồng",
    dataIndex: "idContract",
    key: "idContract",
  },
  {
    title: "Tên hợp đồng",
    dataIndex: "contractName",
    key: "contractName",
  },
  {
    title: "Người ủy quyền",
    dataIndex: "authorizer",
    key: "authorizer",
  },
  {
    title: "Quyền sở hữu",
    dataIndex: "proprietaryRight",
    key: "proprietaryRight",
  },
  {
    title: "Hiệu lực hợp đồng",
    dataIndex: "contractualEffect",
    key: "contractualEffect",
  },
  {
    title: "Ngày tạo",
    dataIndex: "creationDate",
    key: "creationDate",
  },
  {
    render: (_, { id }) => (
      <Link
        to={"/contract/detail/123"}
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
            id: "HD123",
            orderNumber: 1,
            idContract: "HD123",
            contractName: "Hợp đồng uỷ quyền bài hát",
            authorizer: "Vương Anh Tú",
            proprietaryRight: "Người biểu diễn",
            contractualEffect: "Còn thời hạn",
            creationDate: "01/04/2021 15:53:13",
          },
          {
            id: "HD123",
            orderNumber: 1,
            idContract: "HD123",
            contractName: "Hợp đồng uỷ quyền bài hát",
            authorizer: "Vương Anh Tú",
            proprietaryRight: "Người biểu diễn",
            contractualEffect: "Còn thời hạn",
            creationDate: "01/04/2021 15:53:13",
          },
          {
            id: "HD123",
            orderNumber: 1,
            idContract: "HD123",
            contractName: "Hợp đồng uỷ quyền bài hát",
            authorizer: "Vương Anh Tú",
            proprietaryRight: "Người biểu diễn",
            contractualEffect: "Còn thời hạn",
            creationDate: "01/04/2021 15:53:13",
          },
          {
            id: "HD123",
            orderNumber: 1,
            idContract: "HD123",
            contractName: "Hợp đồng uỷ quyền bài hát",
            authorizer: "Vương Anh Tú",
            proprietaryRight: "Người biểu diễn",
            contractualEffect: "Còn thời hạn",
            creationDate: "01/04/2021 15:53:13",
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
