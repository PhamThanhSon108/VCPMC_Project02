import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Badge, Checkbox, Input, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PlayVideoModal from "../../../../shared/components/Modal/PlayVideoModal";
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

export const PropsDefaultRecordStore = {
  id: {
    label: "",
    key: "id",
  },
  orderNumber: {
    label: "Số thứ tự",
  },
  recordName: {
    label: "Tên bản ghi",
    key: "recordName",
  },
  isrcCode: {
    label: "MÃ ISRC",
    key: "isrcCode",
  },
  duration: {
    label: "",
    key: "duration",
  },
  singer: {
    label: "Ca sĩ",
    key: "singer",
  },
  author: {
    label: "Tác giả",
    key: "author",
  },
  type: {
    label: "Thể loại",
    key: "type",
  },
  format: {
    label: "",
  },
  deviceService: {
    label: "",
  },
  useDuration: {
    label: "",
  },
  producer: {
    label: "Nhà xuất bản",
    key: "producer",
  },
};

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
    title: "Mã ISRC",
    dataIndex: "isrcCode",
    key: "isrcCode",
  },
  {
    title: "Số hợp đồng",
    dataIndex: "contractNumber",
    key: "contractNumber",
  },

  {
    title: "Ngày tải",
    dataIndex: "uploadDate",
    key: "uploadDate",
  },

  {
    render: (_, { id }) => {
      return (
        <Link
          to={"/record-store/manager-approval/" + id}
          style={{
            textAlign: "center",
            color: " #FF7506",
            textDecoration: "underline",
          }}
        >
          Nghe
        </Link>
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
export default React.memo(function TableDefaultManagerApproval({
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
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <PlayVideoModal
        path="/record-store/manager-approval"
        isModalOpen={isPlayVideo}
        setIsModalOpen={setIsPlayVideo}
      />
      <Table
        loading={devices.loading}
        className="table-custom"
        columns={columns}
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
            key: "01223",
            id: "String",
            orderNumber: 1,
            recordName: "String",
            isrcCode: "String",
            duration: "String",
            singer: "String",
            author: "String",
            type: "String",
            format: "String",

            useDuration: "String",
            contractNumber: "String",
            uploadDate: "String",
          },
          {
            key: "01224",
            id: "String",
            orderNumber: 1,
            recordName: "String",
            isrcCode: "String",
            duration: "String",
            singer: "String",
            author: "String",
            type: "String",
            format: "String",

            useDuration: "String",
            contractNumber: "String",
            uploadDate: "String",
          },
          {
            key: "0122",
            id: "String",
            orderNumber: 1,
            recordName: "String",
            isrcCode: "String",
            duration: "String",
            singer: "String",
            author: "String",
            type: "String",
            format: "String",

            useDuration: "String",
            contractNumber: "String",
            uploadDate: "String",
          },
        ]}
        rowSelection={rowSelection}
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
