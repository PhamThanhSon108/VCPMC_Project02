import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Col, Form, Modal, Row, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { changePassWord } from "../../../modules/authentication/repository";
import { publicToast } from "../Toast";
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
  const [loading, setLoading] = useState<boolean>();
  const handleChangePassWord = (data: any) => {
    setLoading(true);
    if (data.currentPassword === data.password) {
      publicToast({
        type: "error",
        message: "Mật khẩu mới không được trùng với mật khẩu hiện tại",
        description: "Cập nhật mật khẩu thành công",
      });
      setLoading(false);
      return;
    }
    changePassWord({
      currentPass: data?.currentPassword,
      newPass: data?.password,
    })
      .then((success: { code?: string; message?: string }) => {
        publicToast({
          type: "success",
          message: success?.message || "Cập nhật thành công",
          description: "Cập nhật mật khẩu thành công",
        });
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        publicToast({
          type: "error",
          message: error?.message || "Có lỗi xảy ra!",
          description: "Cập nhật mật khẩu thành công",
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
        onOk={handleChangePassWord}
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
                loading={loading}
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
            <Form
              id="changePasswordForm"
              name="changePasswordForm"
              layout="vertical"
              form={form}
              onFinish={handleChangePassWord}
            >
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
                          message: "Bạn chưa nhập mật khẩu hiện tại",
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
