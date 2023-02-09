import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Row, Spin, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchContract } from "../../../../../modules/contract/contractStore";

import { images } from "../../../../../shared/assets/images";
import CancelContractModal from "../../../../../shared/components/Modal/CancelContractModal";
import ExtendContractModal from "../../../../../shared/components/Modal/ExtendContractModal";

import SwitchTab from "../../../../../shared/components/Tab/SwitchTab";
import { publicToast } from "../../../../../shared/components/Toast";
import { useAppDispatch, useAppSelector } from "../../../../../shared/hooks";
import { authorisationContract } from "../CreateContract/CreateAuthorisationContract";
import AuthorizedWork from "./AuthorizedWork";
import ContractInformation from "./ContractInformation";

export default function DetailContract() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const contract: authorisationContract | any = useAppSelector(
    (state) => state.contract.contract
  );
  const loadingFetchContract: authorisationContract | any = useAppSelector(
    (state) => state.contract.loadingFetchContract
  );
  const [extendContract, setExtendContract] = useState<boolean>(false);
  const [cancelContract, setCancelContract] = useState<boolean>(false);
  const [switchTab, setSwitchTab] = useState<
    "detailContract" | "authorizedWork"
  >("detailContract");
  const fetchDetailContract = async (id: string) => {
    try {
      const contractAction = dispatch(fetchContract({ id }));
      unwrapResult(contractAction);
      //  form.setFieldsValue(contract);
    } catch (error) {
      if (typeof error === "string") {
        publicToast({ type: "error", message: error });
      }
    }
  };
  useEffect(() => {
    console.log(contract, "loading");
    if (id && contract?.id !== id) {
      fetchDetailContract(id);
    }
  }, [id]);

  return (
    <>
      <ExtendContractModal
        isModalOpen={extendContract}
        setIsModalOpen={setExtendContract}
      />
      <CancelContractModal
        isModalOpen={cancelContract}
        setIsModalOpen={setCancelContract}
      />
      <div className="page create-contract" style={{}}>
        <Row className="page__title">
          <Typography.Title>{`Chi tiết hợp đồng ${contract?.contractName} - ${contract?.contractNumber}`}</Typography.Title>
        </Row>
        <Row>
          <Col span={22}>
            <Row style={{ marginBottom: "15px" }}>
              <SwitchTab>
                <span
                  onClick={() => {
                    if (switchTab !== "detailContract")
                      setSwitchTab("detailContract");
                  }}
                  className={switchTab === "detailContract" ? "active" : ""}
                >
                  Thông tin hợp đồng
                </span>
                <span
                  onClick={() => {
                    if (switchTab !== "authorizedWork")
                      setSwitchTab("authorizedWork");
                  }}
                  className={switchTab === "authorizedWork" ? "active" : ""}
                >
                  Tác phẩm ủy quyền
                </span>
              </SwitchTab>
            </Row>
            {switchTab === "detailContract" ? (
              <ContractInformation />
            ) : (
              <AuthorizedWork />
            )}
          </Col>
          <Col span={2} className="page__body-modify">
            {switchTab === "detailContract" ? (
              <>
                <div className="page__body-modify-container">
                  <div className="page__body-modify-container-icon">
                    {images.icon.addDevice}
                  </div>
                  <Link
                    to={id ? `/contract/update-authorisation/${id}` : ""}
                    className="page__body-modify-container-label"
                  >
                    Chỉnh sửa hợp đồng
                  </Link>
                </div>
                <div className="page__body-modify-container">
                  <div className="page__body-modify-container-icon">
                    {images.icon.addDevice}
                  </div>
                  <div
                    onClick={() => {
                      setExtendContract(true);
                    }}
                    className="page__body-modify-container-label"
                  >
                    Gia hạn hợp đồng
                  </div>
                </div>
                <div className="page__body-modify-container">
                  <div
                    className="page__body-modify-container-icon"
                    style={{ color: "red" }}
                  >
                    {images.icon.delete}
                  </div>
                  <div
                    className="page__body-modify-container-label"
                    onClick={() => {
                      setCancelContract(true);
                    }}
                  >
                    Hủy hợp đồng
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="page__body-modify-container">
                  <div className="page__body-modify-container-icon">
                    {images.icon.modifyInformation}
                  </div>
                  <Link
                    to={"add"}
                    className="page__body-modify-container-label"
                    // onClick={handleAddDevice}
                  >
                    Chỉnh sửa tác phẩm
                  </Link>
                </div>
                <div className="page__body-modify-container">
                  <div className="page__body-modify-container-icon">
                    {images.icon.addDevice}
                  </div>
                  <div
                    onClick={() => {
                      setExtendContract(true);
                    }}
                    className="page__body-modify-container-label"
                  >
                    Gia hạn hợp đồng
                  </div>
                </div>
                <div className="page__body-modify-container">
                  <div
                    className="page__body-modify-container-icon"
                    style={{ color: "red" }}
                  >
                    {images.icon.delete}
                  </div>
                  <div
                    className="page__body-modify-container-label"
                    onClick={() => {
                      setCancelContract(true);
                    }}
                  >
                    Hủy hợp đồng
                  </div>
                </div>
                <div className="page__body-modify-container">
                  <div
                    className="page__body-modify-container-icon"
                    style={{ color: "red" }}
                  >
                    {images.icon.addDevice}
                  </div>
                  <Link
                    to={
                      switchTab === "authorizedWork"
                        ? "add-authorisation"
                        : "add-mining"
                    }
                    className="page__body-modify-container-label"
                    // onClick={handleAddDevice}
                  >
                    Thêm bản ghi
                  </Link>
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
      {loadingFetchContract ? (
        <Spin
          indicator={
            <LoadingOutlined
              style={{ fontSize: 35, position: "absolute", top: "50%" }}
              spin
            />
          }
        />
      ) : null}
    </>
  );
}
