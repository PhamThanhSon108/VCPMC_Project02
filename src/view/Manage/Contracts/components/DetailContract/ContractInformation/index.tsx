import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
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
import React from "react";
import IconUpload from "../../../../../../shared/assets/images/icons/IconUpload";
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
                  <span>Số hợp đồng:</span> <span className="red">*</span>
                </>
              }
              name="contractNumber"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>BH123</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Tên hợp đồng:</span> <span className="red">*</span>
                </>
              }
              name="contractName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <label>Hợp đồng uỷ quyền tác phẩm âm nhạc</label>
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
              <label>01/05/2021</label>
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
              <label>01/12/2021</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Tình trạng:</span> <span className="red">*</span>
                </>
              }
              name="userLastname"
              rules={[{ required: true, message: "Tình trạng là bắt buộc" }]}
            >
              <label>Còn thời hạn</label>
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
              <Upload {...props}>
                <Button icon={<IconUpload />} className="btn-upload">
                  Tải lên
                </Button>
              </Upload>
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
                  <span>50%</span>
                </div>
                <div>
                  <span className="bold">Mức nhuận bút</span>
                </div>
                <div>
                  <span>Quyền của người biểu diễn</span>
                  <span>50%</span>
                </div>
                <div>
                  <span>Quyền của nhà sản xuất</span>
                  <span>50%</span>
                </div>
                <div>
                  <span>(bản ghi/video)</span>
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
                  <span>Pháp nhân ủy quyền:</span>{" "}
                  <span className="red">*</span>
                </>
              }
              name="contractNumber"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>Cá nhân</label>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span>Tên người ủy quyền:</span>{" "}
                  <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <label>Còn thời hạn</label>
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
              <label>10/01/1984</label>
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Giới tính:</span> <span className="red">*</span>
                </>
              }
              name=""
              rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
            >
              <label>Nam</label>
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
              <label>Việt nam</label>
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
              <label>(+84) 345 678 901</label>
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>CMND/CCCD:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <label>123456789012</label>
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
              <label>10/07/2011</label>
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
              <label>Tp.HCM, Việt Nam</label>
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
              <label>92387489</label>
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
              <label htmlFor="authorizerName">
                69/53, Nguyễn Gia Trí, Phường 25, Quận Bình Thạnh, Thành phố Hồ
                Chí Minh
              </label>
            </Form.Item>
          </Col>

          <Col span={8} style={{ paddingRight: "25px" }}>
            <Form.Item
              label={
                <>
                  <span>Email:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <label>nguyenvana@gmail.com</label>
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
                {
                  min: 6,
                  message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                },
              ]}
            >
              <Input.Password
                value="1234"
                defaultValue={"123456789"}
                disabled
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <span>Tên đăng nhập:</span> <span className="red">*</span>
                </>
              }
              name="authorizerName"
              rules={[{ required: true, message: "Tên hợp đồng là bắt buộc" }]}
            >
              <label>nguyenvana@gmail.com</label>
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
              <label>1231123312211223</label>
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
              <label>ACB - Ngân hàng Á Châu</label>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default ContractInformation;
