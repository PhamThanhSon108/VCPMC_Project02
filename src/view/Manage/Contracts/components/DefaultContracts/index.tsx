import { Col, Row, Select, Typography } from "antd";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { images } from "../../../../../shared/assets/images";
import SearchCustom from "../../../../../shared/components/Select/SearchCustom";
import SelectFilter from "../../../../../shared/components/Select";
import SwitchTab from "../../../../../shared/components/Tab/SwitchTab";
import TableAuthorisations from "./TableAuthorisations";
import MiningContracts from "./MiningContracts";

import { useAppDispatch, useAppSelector } from "../../../../../shared/hooks/";
import { fetchContracts } from "../../../../../modules/contract/contractStore";
import { unwrapResult } from "@reduxjs/toolkit";
import { authorisationContract } from "../CreateContract/CreateAuthorisationContract";
export default function DefaultContracts() {
  const dispatch = useAppDispatch();
  const { contracts }: authorisationContract[] | any = useAppSelector(
    (state) => state.contract
  );
  const [switchTab, setSwitchTab] = useState<"authorisations" | "mining">(
    "authorisations"
  );

  const getContracts = async () => {
    try {
      const contractsAction = await dispatch(fetchContracts());
      unwrapResult(contractsAction);
    } catch (error) {}
  };
  useEffect(() => {
    if (contracts.length < 1) getContracts();
  }, []);

  return (
    <>
      <div className="page">
        <Row className="page__title">
          <Typography.Title>Danh sách lịch phát</Typography.Title>
        </Row>
        <Row className="page__filter">
          <Col span={22} style={{ display: "flex" }}>
            <SwitchTab>
              <span
                onClick={() => {
                  if (switchTab !== "authorisations")
                    setSwitchTab("authorisations");
                }}
                className={switchTab === "authorisations" ? "active" : ""}
              >
                Hợp đồng ủy quyền
              </span>
              <span
                onClick={() => {
                  if (switchTab !== "mining") setSwitchTab("mining");
                }}
                className={switchTab === "mining" ? "active" : ""}
              >
                Hợp đồng khai thác
              </span>
            </SwitchTab>
          </Col>
        </Row>
        <Row className="page__filter">
          <Col span={22} style={{ display: "flex" }}>
            <SelectFilter
              onChange={() => {}}
              options={[{ label: "Tất cả", value: "all" }]}
              title="Quyền sở hữu:"
              suffixIcon={images.icon.arrow}
            />
            <SelectFilter
              onChange={() => {}}
              options={[{ label: "Tất cả", value: "all" }]}
              title="Hiệu lực hợp đồng:"
              suffixIcon={images.icon.arrow}
            />
            <SearchCustom
              position="right"
              title="Tên hợp đồng, số hợp đồng, người uỷ quyền..."
              allowClear
            />
          </Col>
        </Row>
        <Row className="page__body">
          <Col span={22} className="page__body-table">
            {switchTab === "authorisations" ? (
              <TableAuthorisations />
            ) : (
              <MiningContracts
                statusActive={"all"}
                statusConect={"all"}
                keyWord={""}
              />
            )}
          </Col>
          <Col span={2} className="page__body-modify">
            <div className="page__body-modify-container">
              <div className="page__body-modify-container-icon">
                {images.icon.addDevice}
              </div>
              <Link
                to={
                  switchTab === "authorisations"
                    ? "add-authorisation/id"
                    : "add-mining/id"
                }
                className="page__body-modify-container-label"
                // onClick={handleAddDevice}
              >
                Thêm hợp đồng
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
