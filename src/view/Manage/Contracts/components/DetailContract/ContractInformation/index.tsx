import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { timeStamp } from "console";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import IconUpload from "../../../../../../shared/assets/images/icons/IconUpload";
import { useAppSelector } from "../../../../../../shared/hooks";
import { authorisationContract } from "../../CreateContract/CreateAuthorisationContract";
const convertTimeStampToDateString = (timeStamp: Timestamp) => {
  return new Date(timeStamp?.seconds * 1000).toLocaleDateString();
};
const checkContractExpiration = ({
  timeStamp1,
  timeStamp2,
}: {
  timeStamp1?: Timestamp;
  timeStamp2: Timestamp;
}) => {
  const today = timeStamp1?.seconds
    ? new Date(timeStamp1?.seconds * 1000)
    : new Date();
  const expirationDate = new Date(timeStamp2?.seconds * 1000);
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
};

const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
function ContractInformation() {
  const [form] = useForm();
  const contract: authorisationContract | any = useAppSelector(
    (state) => state.contract.contract
  );

  return (
    <>
      <Form
        name="userProfileForm"
        layout="horizontal"
        requiredMark={false}
        form={form}
        id="userProfileForm"
        onFinish={() => {}}
      >
        <Row className="page__body playlist-add">
          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Số hợp đồng</span>
                </>
              }
              name="contractNumber"
            >
              <label>{contract?.contractNumber}</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Tên hợp đồng</span>
                </>
              }
              name="contractName"
            >
              <label>{contract?.contractName}</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Từ ngày</span>
                </>
              }
              name="userLastnamef"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>
                {convertTimeStampToDateString(contract?.effectiveDate)}
              </label>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Đến ngày</span>
                </>
              }
              name="userLastnameg"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>
                {convertTimeStampToDateString(contract?.expirationDate)}
              </label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Tình trạng</span>
                </>
              }
              name="userLastname"
              rules={[{ required: true, message: "Tình trạng là bắt buộc" }]}
            >
              <label>
                {contract?.reasonCancelContract ? (
                  <Badge
                    text="Bị hủy"
                    status="warning"
                    style={{ color: "white" }}
                  ></Badge>
                ) : (
                  checkContractExpiration({
                    timeStamp2: contract?.expirationDate,
                  })
                )}
              </label>
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Đính kèm tệp</span>
                </>
              }
              name="contractNumber"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <a href={contract?.fileURL} target="_blank" download="docx">
                {contract?.contractName}.doc
              </a>
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              name="contractNumber"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <div className="infor-contract-authorisation">
                <div className="orange bold">
                  <span>Mức nhuận bút</span>
                </div>
                <div>
                  <span className="bold">Quyền tác giả</span>
                  <span>{contract?.ownership?.copyRight || 0}%</span>
                </div>
                <div>
                  <span className="bold">Mức nhuận bút</span>
                </div>
                <div>
                  <span>Quyền của người biểu diễn</span>
                  <span>{contract?.ownership?.performersRight || 0}%</span>
                </div>
                <div>
                  <span>Quyền của nhà sản xuất</span>
                  <span>{contract?.ownership?.executiveRight || 0}%</span>
                </div>
              </div>
            </Form.Item>
          </Col>

          <Divider />
        </Row>
        <Row className="page__title">
          <Typography.Title>Thông tin pháp nhân ủy quyền</Typography.Title>
        </Row>
        <Row className="page__body playlist-add">
          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Pháp nhân ủy quyền</span>{" "}
                </>
              }
              name="contractNumber"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>
                {contract?.unit === "personnal" ? "Cá nhân" : "Tổ chức"}
              </label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Tên người ủy quyền</span>{" "}
                </>
              }
              name="authorizerName"
            >
              <label>{contract?.authorisedPerson?.name}</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Ngày sinh</span>
                </>
              }
              name="authorizerBirthDay"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>
                {convertTimeStampToDateString(
                  contract?.authorisedPerson?.birthday
                )}
              </label>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Giới tính</span>
                </>
              }
              name=""
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>
                {contract?.authorisedPerson?.gender === "1" ? "Nam" : "Nữ"}
              </label>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Quốc tịch</span>
                </>
              }
              name="userLastname"
              rules={[{ required: true, message: "Tình trạng là bắt buộc" }]}
            >
              <label>{contract?.authorisedPerson?.citizenship}</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Số điện thoại</span>
                </>
              }
              name="authorizerName"
            >
              <label>{contract?.authorisedPerson?.phone}</label>
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>CMND/CCCD</span>
                </>
              }
              name="authorizerName"
            >
              <label>{contract?.authorisedPerson?.identificationNumber}</label>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Ngày cấp</span>
                </>
              }
              name="authorizerBirthDay"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>
                {convertTimeStampToDateString(
                  contract?.authorisedPerson?.issueDate
                )}
              </label>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Nơi cấp</span>
                </>
              }
              name="authorizerName"
            >
              <label>{contract?.authorisedPerson?.placeOfIssue}</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Mã số thuế</span>
                </>
              }
              name="authorizerName"
            >
              <label>{contract?.authorisedPerson?.taxCode}</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Nơi cứ trú</span>
                </>
              }
              name="authorizerName"
            >
              <label htmlFor="authorizerName">
                {contract?.authorisedPerson?.residence}
              </label>
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Email</span>
                </>
              }
              name="authorizerName"
            >
              <label>{contract?.authorisedPerson?.email}</label>
            </Form.Item>
            <Form.Item
              validateTrigger={["onSubmit", "onBlur"]}
              label={
                <>
                  <span>Mật khẩu</span>
                </>
              }
              name="password"
              rules={[
                { required: true, message: "Bạn chưa nhập mật khẩu" },
                {
                  min: 6,
                  message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                },
              ]}
            >
              <Input.Password
                value="1234"
                defaultValue={contract?.authorisedPerson?.password}
                disabled
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Tên đăng nhập</span>
                </>
              }
              name="authorizerName"
            >
              <label>{contract?.authorisedPerson?.email}</label>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Số tài khoản</span>
                </>
              }
              name="authorizerName"
            >
              <label>{contract?.authorisedPerson?.numberedAccount}</label>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Ngân hàng</span>
                </>
              }
              name="authorizerName"
            >
              <label>{<label>{contract?.authorisedPerson?.bank}</label>}</label>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default ContractInformation;
