import { Button, Col, Form, Modal, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Input from "../Input";
import { publicToast } from "../Toast";

import "./PlayVideoModal.scss";
function RefuseApprovalModal({
  isModalOpen,
  setIsModalOpen,
  url,
}: {
  isModalOpen?: boolean;
  setIsModalOpen: (value: boolean) => void;
  url?: string;
}) {
  const [form] = Form.useForm();
  const currentPassword = Form.useWatch("password", form);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    publicToast({
      type: "success",
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
      {isModalOpen ? (
        <Modal
          className="modal-container"
          title="LÝ DO TỪ CHỐI PHÊ DUYỆT"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <Row>
              <div
                className="btn-wrap"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  height: "100%",
                  marginTop: "20px",
                }}
              >
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
              <Form
                id="changePasswordForm"
                name="changePasswordForm"
                layout="vertical"
                form={form}
                onFinish={handleOk}
              >
                <Row className="profile-form__box modal-wrap" justify="center">
                  <Col span={24}>
                    <TextArea
                      placeholder={
                        "Cho chúng tôi biết lý do bạn muốn từ chối phê duyệt bản ghi này..."
                      }
                      maxLength={8}
                      rows={8}
                      style={{ resize: "none" }}
                    ></TextArea>
                  </Col>
                </Row>

                <Row
                  className="profile-form__box modal-wrap"
                  justify="center"
                ></Row>
              </Form>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default RefuseApprovalModal;
