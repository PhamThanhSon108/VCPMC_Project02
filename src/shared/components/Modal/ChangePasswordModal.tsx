import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Col, Form, Modal, Row, Input, Button } from "antd";
import "./ChangePasswordModal.scss";

function ChangePasswordModal({
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className="modal-container"
        title="THAY ĐỔI MẬT KHẨU"
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
                Lưu
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
            <Form name="formChangePassword" layout="vertical" form={form}>
              <Row className="profile-form__box modal-wrap" justify="center">
                <Col span={24}>
                  <div className="main-form">
                    <Form.Item
                      label={"Mật khẩu hiện tại"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      messageVariables={{ label: "good" }}
                      className="wrap-login__input"
                      name="currentPassword"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập mật khẩu mới",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                      ]}
                    >
                      <Input.Password
                        className={"login__input"}
                        placeholder="Mật khẩu"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>

              <Row className="profile-form__box modal-wrap" justify="center">
                <Col span={24}>
                  <div className="main-form">
                    <Form.Item
                      label={"Mật khẩu mới"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      messageVariables={{ label: "good" }}
                      className="wrap-login__input"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập mật khẩu mới",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                      ]}
                    >
                      <Input.Password
                        className={"login__input"}
                        placeholder="Mật khẩu"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row className="profile-form__box modal-wrap" justify="center">
                <Col span={24}>
                  <div className="main-form">
                    <Form.Item
                      label={"Nhập lại mật khẩu mới"}
                      validateTrigger={["onSubmit", "onBlur"]}
                      className="wrap-login__input"
                      style={{ marginBottom: "12px" }}
                      name="confirmpassword"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập xác nhận mật khẩu mới",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                        },
                        {
                          validator: async (_, confirmpassword) => {
                            if (confirmpassword !== currentPassword)
                              return Promise.reject(
                                new Error("Mật khẩu không khớp")
                              );
                          },
                        },
                      ]}
                    >
                      <Input.Password
                        className={"login__input"}
                        placeholder="Nhập lại mật khẩu"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
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

export default ChangePasswordModal;
