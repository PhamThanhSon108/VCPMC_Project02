import { Button, Col, Form, Modal, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ReasonCancelContractModal({
  reason,
  isModalOpen,
  setIsModalOpen,
}: {
  reason: { message: string; title: string };
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) {
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (reason) {
      form.setFieldValue("reasonCancelContract", reason?.message);
    }
  }, [reason]);
  const handleOk = (data: any) => {
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
          title={reason?.title}
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
                <Button
                  className="confirm"
                  htmlType="submit"
                  form="cancelContract"
                >
                  Đóng
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
                id="cancelContract"
                name="cancelContract"
                layout="vertical"
                form={form}
                onFinish={handleOk}
              >
                <Row className="profile-form__box modal-wrap" justify="center">
                  <Col span={24}>
                    <Form.Item name={"reasonCancelContract"}>
                      <TextArea
                        placeholder={reason?.message}
                        maxLength={100}
                        rows={8}
                        style={{ resize: "none" }}
                        value={reason?.message}
                      ></TextArea>
                    </Form.Item>
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
