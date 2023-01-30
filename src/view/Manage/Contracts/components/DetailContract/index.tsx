import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../../../../shared/assets/images";
import SwitchTab from "../../../../../shared/components/Tab/SwitchTab";
import AuthorizedWork from "./AuthorizedWork";
import ContractInformation from "./ContractInformation";

export default function DetailContract() {
  const [switchTab, setSwitchTab] = useState<
    "detailContract" | "authorizedWork"
  >("detailContract");
  const [form] = useForm();
  return (
    <div className="page create-contract" style={{}}>
      <Row className="page__title">
        <Typography.Title>
          Chi tiết hợp đồng uỷ quyền bài hát - BH123
        </Typography.Title>
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
                  to={"add"}
                  className="page__body-modify-container-label"
                  // onClick={handleAddDevice}
                >
                  Chỉnh sử hợp đồng
                </Link>
              </div>
              <div className="page__body-modify-container">
                <div className="page__body-modify-container-icon">
                  {images.icon.addDevice}
                </div>
                <Link
                  to={"add"}
                  className="page__body-modify-container-label"
                  // onClick={handleAddDevice}
                >
                  Gia hạn hợp đồng
                </Link>
              </div>
              <div className="page__body-modify-container">
                <div
                  className="page__body-modify-container-icon"
                  style={{ color: "red" }}
                >
                  {images.icon.delete}
                </div>
                <Link
                  to={"add"}
                  className="page__body-modify-container-label"
                  // onClick={handleAddDevice}
                >
                  Hủy hợp đồng
                </Link>
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
                <Link
                  to={"add"}
                  className="page__body-modify-container-label"
                  // onClick={handleAddDevice}
                >
                  Gia hạn hợp đồng
                </Link>
              </div>
              <div className="page__body-modify-container">
                <div
                  className="page__body-modify-container-icon"
                  style={{ color: "red" }}
                >
                  {images.icon.delete}
                </div>
                <Link
                  to={"add"}
                  className="page__body-modify-container-label"
                  // onClick={handleAddDevice}
                >
                  Hủy hợp đồng
                </Link>
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
  );
}
