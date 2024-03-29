import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Modal, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router-dom";
import {
  fetchContract,
  fetchContracts,
} from "../../../modules/contract/contractStore";
import { cancelContractAsync } from "../../../modules/contract/repository";
import { useAppDispatch } from "../../hooks";
import { publicToast } from "../Toast";

import "./PlayVideoModal.scss";
export default function CancelContractModal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handleOk = (data: any) => {
    if (id && data?.reasonCancelContract) {
      cancelContractAsync({ id: id, reason: data?.reasonCancelContract }).then(
        () => {
          setIsModalOpen(false);
          publicToast({
            type: "success",
            message: "Thành công",
            description: "Cập nhật thành công",
          });
          const contractAction = dispatch(fetchContract({ id }));
          dispatch(fetchContracts());
          unwrapResult(contractAction);
        }
      );
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen ? (
        <Modal
          className="modal-container"
          title="Hủy hợp đồng ủy quyền"
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
                  Quay lại
                </Button>
                <Button
                  className="confirm"
                  htmlType="submit"
                  form="cancelContract"
                >
                  Hủy hơp đồng
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
                        placeholder={
                          "Cho chúng tôi biết lý do bạn muốn huỷ hợp đồng uỷ quyền này..."
                        }
                        maxLength={100}
                        rows={8}
                        style={{ resize: "none" }}
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
