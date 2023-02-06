import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Checkbox,
  Row,
  Typography,
  Upload,
} from "antd";
import { propsUpload } from "../../../view/Manage/Contracts/components/CreateContract";
import IconUpload from "../../assets/images/icons/IconUpload";
import { publicToast } from "../Toast";
import "./ExtendContractModal.scss";

function ExtendContractModal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) {
  const [form] = Form.useForm();
  const showModal = () => {
    if (setIsModalOpen) setIsModalOpen(true);
  };
  const dateFormat = "YYYY-MM-DD";
  const handleOk = () => {
    publicToast({
      type: "success",
      message: "Thành công",
      description: "Cập nhật mật khẩu thành công",
    });
    if (setIsModalOpen) setIsModalOpen(false);
  };

  const handleCancel = () => {
    if (setIsModalOpen) setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen ? (
        <Modal
          className="modal-container extend-contract-modal"
          title="Gia hạn uỷ quyền tác phẩm"
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
                  paddingBottom: "1rem",
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
                layout="horizontal"
                form={form}
                onFinish={handleOk}
              >
                <Row className="profile-form__box modal-wrap" justify="center">
                  <Col span={12}>
                    <Typography.Text className="title">
                      Thời gian gia hạn
                    </Typography.Text>
                    <Form.Item
                      label={
                        <>
                          <span className="form-label">Từ ngày:</span>
                        </>
                      }
                      name="userLastnameg"
                      rules={[{ message: "Tiêu đề là bắt buộc" }]}
                    >
                      <span>02/02/2022</span>
                    </Form.Item>
                    <Form.Item
                      label={
                        <>
                          <span>Đến ngày:</span>
                        </>
                      }
                      name="userLastnameg"
                      rules={[{ message: "Tiêu đề là bắt buộc" }]}
                    >
                      <DatePicker />
                    </Form.Item>
                    <span className="note">
                      Lưu ý: Thời gian bắt đầu gia hạn hợp đồng mới được tính
                      sau ngày hết hạn hợp đồng cũ một ngày.
                    </span>
                  </Col>
                  <Col span={12}>
                    <Typography.Text className="title">
                      Mức nhuận bút
                    </Typography.Text>
                    <div className="checkbox-option">
                      <Checkbox />
                      <Form.Item
                        label={
                          <>
                            <span>Quyền tác giả:</span>
                          </>
                        }
                        name="contractName"
                        rules={[
                          {
                            message: "Quyền tác giả là bắt buộc",
                          },
                        ]}
                      >
                        <Input maxLength={100} /> <span>%</span>
                      </Form.Item>
                    </div>

                    <div className="checkbox-option2">
                      <Checkbox />
                      <span> Quyền liên quan</span>
                      <div className="child-wrap">
                        <div className="child-item">
                          <div className="wrap-checkbox1">
                            <Checkbox />
                          </div>
                          <Form.Item
                            label={
                              <>
                                <span>Quyền của người biểu diễn:</span>{" "}
                              </>
                            }
                            name="contractName"
                            rules={[
                              {
                                message: "Quyền tác giả là bắt buộc",
                              },
                            ]}
                          >
                            <Input maxLength={100} /> <span>%</span>
                          </Form.Item>
                        </div>

                        <div className="child-item">
                          <div className="wrap-checkbox">
                            <Checkbox />
                          </div>
                          <Form.Item
                            label={
                              <>
                                <span className="child-item-label">
                                  Quyền của nhà sản xuất (bản ghi/video):
                                </span>
                              </>
                            }
                            name="contractName"
                            rules={[
                              {
                                message: "Quyền tác giả là bắt buộc",
                              },
                            ]}
                          >
                            <Input maxLength={20} /> <span>%</span>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row
                  className="profile-form__box modal-wrap upload"
                  justify="start"
                >
                  <Col
                    span={12}
                    style={{
                      paddingRight: "25px",
                      textAlign: "center",
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Form.Item
                      label={<span className="title">Đính kèm tệp:</span>}
                      name="file"
                      rules={[{ message: "Tiêu đề là bắt buộc" }]}
                    >
                      <Upload {...propsUpload}>
                        <Button icon={<IconUpload />} className="btn-upload">
                          Tải lên
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default ExtendContractModal;
