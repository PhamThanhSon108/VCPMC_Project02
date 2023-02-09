import { unwrapResult } from "@reduxjs/toolkit";
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
  InputNumber,
} from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchContract,
  fetchContracts,
} from "../../../modules/contract/contractStore";
import { extendContract } from "../../../modules/contract/repository";
import { propsUpload } from "../../../view/Manage/Contracts/components/CreateContract";
import { authorisationContract } from "../../../view/Manage/Contracts/components/CreateContract/CreateAuthorisationContract";
import IconUpload from "../../assets/images/icons/IconUpload";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { publicToast } from "../Toast";
import "./ExtendContractModal.scss";

function ExtendContractModal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) {
  const dateFormat = "YYYY-MM-DD";
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const contract: authorisationContract | any = useAppSelector(
    (state) => state.contract.contract
  );
  const [copyRight, setCopyRight] = useState<0 | 1 | 2>(0);
  const showModal = () => {
    if (setIsModalOpen) setIsModalOpen(true);
  };

  const { id } = useParams();
  const [file, setFile] = useState<File | null | any>(null);
  const validateCopyRight = ({
    data,
    currentCopyRight,
    currentPerformersRight,
    currentExecutiveRight,
  }: {
    data: any;
    currentCopyRight: number;
    currentPerformersRight: number;
    currentExecutiveRight: number;
  }) => {
    if (copyRight === 1) {
      if (
        !currentCopyRight ||
        currentCopyRight > 100 ||
        currentCopyRight <= 0
      ) {
        publicToast({ type: "error", message: "Quyền tác giả không hợp lệ!1" });
        return;
      }
      data["performersRight"] = 0;
      data["executiveRight"] = 0;
    }
    if (copyRight === 2) {
      if (
        !currentPerformersRight ||
        !currentExecutiveRight ||
        currentPerformersRight + currentExecutiveRight > 100
      ) {
        console.log(
          currentPerformersRight,
          currentExecutiveRight,
          currentPerformersRight + currentExecutiveRight
        );

        publicToast({ type: "error", message: "Quyền tác giả không hợp lệ!2" });
        return;
      }

      data["copyRight"] = 0;
    }
  };

  const handleSuccesExtendContract = async () => {
    publicToast({ type: "success", message: "Gia hạn thành công" });
    const contractAction = dispatch(fetchContract({ id }));
    unwrapResult(contractAction);
    const contractsAction = dispatch(fetchContracts());
    await Promise.all([contractAction, contractAction]);
  };
  const handleOk = (data: any) => {
    const currentCopyRight = parseInt(data?.copyRight);
    const currentPerformersRight = parseInt(data?.performersRight);
    const currentExecutiveRight = parseInt(data?.executiveRight);
    validateCopyRight({
      data,
      currentCopyRight,
      currentExecutiveRight,
      currentPerformersRight,
    });
    if (id) {
      extendContract({
        id: id,
        contract: Object.assign(data, { file: file }),
      })
        .then(() => {
          handleSuccesExtendContract();
        })
        .catch(() => {
          publicToast({ type: "error", message: "Có lỗi xảy ra" });
        });
    }
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
                      name="timeExtendContract"
                    >
                      <span>
                        {new Date(
                          contract?.expirationDate?.seconds * 1000 +
                            24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </span>
                    </Form.Item>
                    <Form.Item
                      label={
                        <>
                          <span>Đến ngày:</span>
                        </>
                      }
                      name="expirationDate"
                      rules={[
                        { required: true, message: "Trường này là bắt buộc" },
                      ]}
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
                    <div
                      className={`checkbox-option ${
                        copyRight === 2 ? "disable" : ""
                      }`}
                    >
                      <Checkbox
                        checked={copyRight === 1}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCopyRight(1);
                          } else {
                            setCopyRight(0);
                          }
                        }}
                      />

                      <Form.Item
                        label={
                          <>
                            <span>Quyền tác giả:</span>
                          </>
                        }
                        name="copyRight"

                        // rules={[
                        //   {
                        //     required: copyRight === 1,
                        //     message: "Trường này là bắt buộc",
                        //   },
                        // ]}
                      >
                        <InputNumber
                          disabled={copyRight === 2}
                          maxLength={100}
                        />
                      </Form.Item>
                    </div>

                    <div
                      className={`checkbox-option2 ${
                        copyRight === 1 ? "disable" : ""
                      }`}
                    >
                      <Checkbox
                        checked={copyRight === 2}
                        onChange={(e) => {
                          if (e.target.checked) {
                            console.log(copyRight, "copu");

                            setCopyRight(2);
                          } else {
                            setCopyRight(0);
                          }
                        }}
                      />
                      <span>Quyền liên quan</span>
                      <div className={`child-wrap`}>
                        <div className="child-item">
                          <div className="wrap-checkbox1">
                            <Checkbox disabled={copyRight === 1} />
                          </div>
                          <Form.Item
                            label={
                              <>
                                <span>Quyền của người biểu diễn:</span>{" "}
                              </>
                            }
                            name="performersRight"
                            rules={[
                              {
                                required: copyRight === 2,
                                message: "Trường này là bắt buộc",
                              },
                            ]}
                          >
                            <InputNumber
                              checked={copyRight === 2}
                              disabled={copyRight === 1}
                              maxLength={100}
                            />
                          </Form.Item>
                        </div>

                        <div className="child-item">
                          <div className="wrap-checkbox">
                            <Checkbox
                              checked={copyRight === 2}
                              disabled={copyRight === 1}
                            />
                          </div>
                          <Form.Item
                            label={
                              <>
                                <span className="child-item-label">
                                  Quyền của nhà sản xuất (bản ghi/video):
                                </span>
                              </>
                            }
                            name="executiveRight"
                            rules={[
                              {
                                required: copyRight === 2,
                                message: "Trường này là bắt buộc",
                              },
                            ]}
                          >
                            <InputNumber
                              disabled={copyRight === 1}
                              maxLength={20}
                            />
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
