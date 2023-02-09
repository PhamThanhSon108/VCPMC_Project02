import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Badge, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../shared/hooks";
import { authorisationContract } from "../CreateContract/CreateAuthorisationContract";
import ReasonCancelContractModal from "./ReasonCancelContractModal";

// export interface DataType {
//   id: string;
//   orderNumber: number;
//   idContract: string;
//   contractName: string;
//   authorizer: string;
//   proprietaryRight: string;
//   contractualEffect: string;
//   creationDate: string;
// }
let columns: ColumnsType<authorisationContract> = [
  {
    title: "STT",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "Số hợp đồng",
    dataIndex: "contractNumber",
    key: "contractNumber",
  },
  {
    title: "Tên hợp đồng",
    dataIndex: "contractName",
    key: "contractName",
  },
  {
    title: "Người ủy quyền",
    dataIndex: "name",
    key: "name",
    render: (_, record) => {
      return record.authorisedPerson.name;
    },
  },
  {
    title: "Quyền sở hữu",

    key: "ownership",
    render: (_, record: any) => {
      if (record?.ownership?.copyRight > 0) {
        return "Quyền tác giả";
      }
      return "Quyền của người biểu diễn, quyền của nhà sản xuất";
    },
  },
  {
    title: "Hiệu lực hợp đồng",
    key: "contractualEffect",
    render: (_, record: any) => {
      const today = new Date();
      const expirationDate = new Date(record?.expirationDate?.seconds * 1000);
      if (record?.reasonCancelContract) {
        return (
          <Badge
            text="Bị hủy"
            status="warning"
            style={{ color: "white" }}
          ></Badge>
        );
      }
      if (today <= expirationDate) {
        return (
          <Badge
            text="Còn thời hạn"
            status="processing"
            style={{ color: "white" }}
          ></Badge>
        );
      } else
        return (
          <Badge
            text="Hết thời hạn"
            status="error"
            style={{ color: "white" }}
          ></Badge>
        );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record: any) => {
      return new Date(record?.createdAt?.seconds * 1000).toLocaleDateString();
    },
  },
  {
    render: (_, { id }) => (
      <Link
        to={`/contract/detail/${id}`}
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
export default React.memo(function TableAuthorisations() {
  const { contracts, loadingFetchContracts } = useAppSelector(
    (state) => state.contract
  );
  let data: authorisationContract | any = contracts;
  const [isOpenModalReasonCancelContract, setIsOpenModalReasonCancelContract] =
    useState<boolean>(false);
  const [reasonCancelContract, setReasonCancelContract] = useState<{
    message: string;
    title: string;
  }>({ message: "", title: "" });
  const [numbRowInPage, setNumbRowInPage] = useState<number>(13);
  const handleOpenModalReasonCancelContract = (reason: {
    message: string;
    title: string;
  }) => {
    console.log(reason);

    setReasonCancelContract(reason);
    setIsOpenModalReasonCancelContract(true);
  };
  useEffect(() => {
    if (columns?.length === 8) {
      columns[8] = {
        render: (_, record: any) => {
          console.log("nono");
          if (record?.reasonCancelContract) {
            return (
              <div
                onClick={() => {
                  handleOpenModalReasonCancelContract({
                    message: record?.reasonCancelContract,
                    title: record?.contractName,
                  });
                }}
                style={{
                  textAlign: "center",
                  color: " #FF7506",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Lý do hủy
              </div>
            );
          }
        },
      };
    }
  }, [reasonCancelContract.title]);
  console.log(reasonCancelContract, "reason");

  return (
    <>
      {
        <ReasonCancelContractModal
          reason={reasonCancelContract}
          isModalOpen={isOpenModalReasonCancelContract}
          setIsModalOpen={setIsOpenModalReasonCancelContract}
        />
      }
      <Table
        loading={loadingFetchContracts}
        className="table-custom"
        columns={columns}
        dataSource={contracts}
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
