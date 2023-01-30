import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Col, Form, Modal, Row, Input, Button, Select, Upload } from "antd";
import { propsUpload } from "../../../view/Manage/Contracts/components/CreateContract";
import IconUpload from "../../assets/images/icons/IconUpload";
import { publicToast } from "../Toast";
import "./ChangePasswordModal.scss";

function AddRecordsModal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) {
  const [form] = Form.useForm();
  const currentPassword = Form.useWatch("password", form);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    publicToast({
      type: "error",
      message: "Thành công",
      description: "Cập nhật mật khẩu thành công",
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className="modal-container"
        title="THÊM BẢN GHI MỚI"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Row>
            <div className="btn-wrap" style={{ alignItems: "center" }}>
              <Button className="cancel" onClick={handleCancel}>
                Hủy bỏ
              </Button>
              <Button
                className="confirm"
                htmlType="submit"
                form="changePasswordForm"
              >
                Tải lên
              </Button>
            </div>
          </Row>
        }
      >
        <div
          className="profile-page"
          style={{
            width: "100%",
            paddingLeft: "0px",
            height: "auto !important",
          }}
        >
          <div className="profile-user__box">
            <Form
              id="changePasswordForm"
              name="changePasswordForm"
              layout="vertical"
              form={form}
              onFinish={handleOk}
            >
              <Row className="profile-form__box modal-wrap" justify="center">
                <Col span={24}>
                  <div className="main-form">
                    <Form.Item
                      label={"Tên bản ghi"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      messageVariables={{ label: "good" }}
                      className="wrap-login__input"
                      name="recordName"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập trường này",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                      ]}
                    >
                      <Input
                        className={"login__input"}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row className="profile-form__box modal-wrap" justify="center">
                <Col span={24}>
                  <div className="main-form">
                    <Form.Item
                      label={"Mã ISRC"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      messageVariables={{ label: "good" }}
                      className="wrap-login__input"
                      name="recordName"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập trường này",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                      ]}
                    >
                      <Input
                        className={"login__input"}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row className="profile-form__box modal-wrap" justify="center">
                <Col span={24}>
                  <div className="main-form">
                    <Form.Item
                      label={"Tác giả"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      messageVariables={{ label: "good" }}
                      className="wrap-login__input"
                      name="recordName"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập trường này",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                      ]}
                    >
                      <Input
                        className={"login__input"}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row className="profile-form__box modal-wrap" justify="center">
                <Col span={24}>
                  <div className="main-form">
                    <Form.Item
                      label={"Ca sĩ/Nhóm nhạc"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      messageVariables={{ label: "good" }}
                      className="wrap-login__input"
                      name="recordName"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập trường này",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                      ]}
                    >
                      <Input
                        className={"login__input"}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row
                className="profile-form__box modal-wrap"
                justify="space-between"
                style={{ padding: "0 20px" }}
              >
                <Col span={11}>
                  <div className="main-form">
                    <Form.Item
                      label={"Thể loại"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      messageVariables={{ label: "good" }}
                      className="wrap-login__input"
                      name="recordName"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập trường này",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn một thể loại"
                        options={[
                          { label: "Pop", value: "pop" },
                          { label: "Ballad", value: "ballad" },
                          { label: "Rock", value: "rock" },
                          { label: "EDM", value: "edm" },
                        ]}
                      ></Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={11}>
                  <div className="main-form">
                    <Form.Item
                      label={"Nhà sản xuất"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      messageVariables={{ label: "good" }}
                      className="wrap-login__input"
                      name="recordName"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập trường này",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                      ]}
                    >
                      <Input
                        className={"login__input"}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row className="profile-form__box modal-wrap" justify="center">
                <Col span={12}>
                  <div className="main-form">
                    <Form.Item
                      className="form-item-horizon"
                      label={
                        <>
                          <span>Đính kèm bản ghi:</span>{" "}
                          <span className="red">*</span>
                        </>
                      }
                      name="contractNumber"
                      rules={[
                        { required: true, message: "Tiêu đề là bắt buộc" },
                      ]}
                    >
                      <Upload {...propsUpload}>
                        <Button icon={<IconUpload />} className="btn-upload">
                          Tải lên
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="main-form">
                    <Form.Item
                      className="form-item-horizon"
                      label={
                        <>
                          <span>Đính kèm lời bài hát:</span>{" "}
                          <span className="red">*</span>
                        </>
                      }
                      name="contractNumber"
                      rules={[
                        { required: true, message: "Tiêu đề là bắt buộc" },
                      ]}
                    >
                      <Upload {...propsUpload}>
                        <Button icon={<IconUpload />} className="btn-upload">
                          Tải lên
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddRecordsModal;
