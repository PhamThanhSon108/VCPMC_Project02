import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
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
  Switch,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { images } from "../../../../../shared/assets/images";
import IconUpload from "../../../../../shared/assets/images/icons/IconUpload";
import "./styles.scss";
export const propsUpload: UploadProps = {
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
export default function CreateMiningContract() {
  const [form] = useForm();
  return (
    <div
      className="page create-contract"
      style={{ marginRight: "35px", paddingRight: "35px" }}
    >
      <Row className="page__title">
        <Typography.Title>Thêm hợp đồng khai thác mới</Typography.Title>
      </Row>

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
                  <span>Tên hợp đồng:</span> <span className="red">*</span>
                </>
              }
              name="contractNumber"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Số hợp đồng:</span> <span className="red">*</span>
                </>
              }
              name="contractName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Từ ngày:</span> <span className="red">*</span>
                </>
              }
              name="userLastnamef"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <DatePicker className="sort" />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Đến ngày:</span> <span className="red">*</span>
                </>
              }
              name="userLastnameg"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <DatePicker className="sort" />
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Đính kèm tệp:</span> <span className="red">*</span>
                </>
              }
              name="contractNumber"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <Upload {...propsUpload}>
                <Button icon={<IconUpload />} className="btn-upload">
                  Tải lên
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <div className="type-mining-contract">
              <div className="type-mining-contract-label">
                <Radio />
                <span>Trọn gói</span>
              </div>
              <div>
                <Form.Item
                  label={
                    <>
                      <span>Giá trị hợp đồng:</span>{" "}
                      <span className="red">*</span>
                    </>
                  }
                  name="authorizerName"
                  rules={[
                    { required: true, message: "Tên hợp đồng là bắt buộc" },
                  ]}
                >
                  <Input maxLength={100} />
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      <span>Giá trị phân phối (VNĐ)/ngày:</span>{" "}
                      <span className="red">*</span>
                    </>
                  }
                  name="authorizerName"
                  rules={[
                    { required: true, message: "Tên hợp đồng là bắt buộc" },
                  ]}
                >
                  <Input maxLength={100} />
                </Form.Item>
              </div>
            </div>

            <div className="type-mining-contract">
              <div className="type-mining-contract-label">
                <Radio />
                <span>Lượt phát</span>
              </div>
              <div>
                <Form.Item
                  label={
                    <>
                      <span>Giá trị lượt phát (VNĐ)/ngày:</span>{" "}
                      <span className="red">*</span>
                    </>
                  }
                  name="authorizerName"
                  rules={[
                    { required: true, message: "Tên hợp đồng là bắt buộc" },
                  ]}
                >
                  <Input maxLength={100} />
                </Form.Item>
              </div>
            </div>
          </Col>

          <Divider />
        </Row>

        <Row className="page__body playlist-add">
          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Tên đơn vị sử dụng:</span>{" "}
                  <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Người đại diện:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Chức vụ:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Ngày sinh:</span> <span className="red">*</span>
                </>
              }
              name="authorizerBirthDay"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <DatePicker className="sort" />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Quốc tịch:</span> <span className="red">*</span>
                </>
              }
              name="userLastname"
              rules={[{ required: true, message: "Tình trạng là bắt buộc" }]}
            >
              <Select
                options={[
                  {
                    value: "disabled",
                    disabled: true,
                    label: "Đang hiệu lực",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Số điện thoại:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Email:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Giới tính:</span> <span className="red">*</span>
                </>
              }
              name=""
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <Radio.Group>
                <Radio className="white-font-color" value={1}>
                  Nam
                </Radio>
                <Radio className="white-font-color" value={2}>
                  Nữ
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>CMND/CCCD:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} className="sort" />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Ngày cấp:</span> <span className="red">*</span>
                </>
              }
              name="authorizerBirthDay"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <DatePicker className="sort" />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Nơi cấp:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Mã số thuế:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Nơi cứ trú:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Tên đăng nhập:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
            <Form.Item
              validateTrigger={["onSubmit", "onBlur"]}
              label={
                <>
                  <span>Mật khẩu:</span> <span className="red">*</span>
                </>
              }
              name="password"
              rules={[
                { required: true, message: "Bạn chưa nhập mật khẩu" },
                { min: 6, message: "Mật khẩu có độ dài tối thiểu là 6 ký tự" },
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Số tài khoản:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Ngân hàng:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
          <div className="note">
            <span>*</span>
            <span>Là những trường thông tin bắt buộc</span>
          </div>
          <Col span={24} className="page__body-table">
            <div
              className="btn-wrap"
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button className="cancel">Hủy bỏ</Button>
              <Button
                className="confirm"
                htmlType="submit"
                form="changePasswordForm"
              >
                Lưu
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
