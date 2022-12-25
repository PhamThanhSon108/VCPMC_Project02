import {
  Col,
  Form,
  Row,
  Typography,
  Input,
  Button,
  Avatar,
  Badge,
  Select,
} from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../../../shared/assets/images";
import SelectFilter from "../../../../shared/components/Select";
import { PropsDefaultRecordStore } from "../DefaultRecordStore/TableDefaulRecordStore";

export default function UpdateRecord() {
  const [form] = Form.useForm();
  const handleUpdateProfile = () => {};
  return (
    <div>
      <div className="page-title">Thông tin cơ bản</div>
      <div className="page-update-record-wrap" style={{ width: "100%" }}>
        <Form
          name="userProfileForm"
          layout="vertical"
          requiredMark={false}
          form={form}
          id="userProfileForm"
          onFinish={handleUpdateProfile}
        >
          <Row justify="center">
            <Col span={22}>
              <Row className={"custom-row-wrap"} justify="center">
                <Col span={8} className={"custom-col-wrap"}>
                  <div className="custom-des">
                    <div className="custom-des-title">Thông tin bản ghi</div>

                    <div className="custom-des-avt">
                      <span className="custom-des-avt-img">
                        <Avatar size={"large"} />
                        <div className="custom-des-avt-img-icon">
                          {images.icon.camera}
                        </div>
                      </span>
                      <span className="custom-des-avt-name">
                        <span className="custom-des-avt-name-icon">
                          {images.icon.music}
                        </span>
                        Chúng ta không thuộc về nhau
                      </span>
                    </div>
                    <div className="custom-des-content-wrap">
                      <div className="custom-des-content-item">
                        <span className="custom-des-content-item-main">
                          Ngày thêm
                        </span>
                        <span className="custom-des-content-item-property">
                          11/22/2022 - 15:40:50
                        </span>
                      </div>

                      <div className="custom-des-content-item">
                        <span className="custom-des-content-item-main">
                          Người tải lên
                        </span>
                        <span className="custom-des-content-item-property">
                          Soobin Hoàng Sơn
                        </span>
                      </div>

                      <div className="custom-des-content-item">
                        <span className="custom-des-content-item-main">
                          Người duyệt
                        </span>
                        <span className="custom-des-content-item-property">
                          Hệ thống (Tự động phê duyệt)
                        </span>
                      </div>

                      <div className="custom-des-content-item">
                        <span className="custom-des-content-item-main">
                          Ngày phê duyệt
                        </span>
                        <span className="custom-des-content-item-property">
                          12/22/2022 - 15:40:50
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="custom-des" style={{ marginBottom: 0 }}>
                    <div className="custom-des-title">Thông tin ủy quyền</div>
                    <div className="custom-des-content-wrap">
                      <div className="custom-des-content-item">
                        <span className="custom-des-content-item-main">
                          Số hợp đồng
                        </span>
                        <span className="custom-des-content-item-property">
                          185RCB
                        </span>
                      </div>

                      <div className="custom-des-content-item">
                        <span className="custom-des-content-item-main">
                          Ngày nhận ủy quyền
                        </span>
                        <span className="custom-des-content-item-property">
                          18/05/2022
                        </span>
                      </div>

                      <div className="custom-des-content-item">
                        <span className="custom-des-content-item-main">
                          Ngày hết hạn
                        </span>
                        <span className="custom-des-content-item-property">
                          18/09/2023
                        </span>
                      </div>

                      <div className="custom-des-content-item">
                        <span className="custom-des-content-item-main">
                          Trạng thái
                        </span>
                        <span className="custom-des-content-item-property">
                          <Badge
                            status="processing"
                            text={
                              <span style={{ color: "white" }}>
                                Còn thời gian
                              </span>
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className={"custom-col-wrap"} span={10}>
                  <div className="custom-des" style={{ height: "100%" }}>
                    <div className="custom-des-title">Chỉnh sửa thông tin</div>
                    <div style={{ margin: "15px 0" }}>
                      <Form.Item
                        label={PropsDefaultRecordStore.recordName.label}
                        className="custom-des-form-input"
                        name={PropsDefaultRecordStore.recordName.key}
                        rules={[]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label={PropsDefaultRecordStore.isrcCode.label}
                        className="custom-des-form-input"
                        name={PropsDefaultRecordStore.isrcCode.key}
                        rules={[]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label={PropsDefaultRecordStore.singer.label}
                        className="custom-des-form-input"
                        name={PropsDefaultRecordStore.singer.key}
                        rules={[]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label={PropsDefaultRecordStore.author.label}
                        className="custom-des-form-input"
                        name={PropsDefaultRecordStore.author.key}
                        rules={[]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label={PropsDefaultRecordStore.producer.label}
                        className="custom-des-form-input"
                        name={PropsDefaultRecordStore.producer.key}
                        rules={[]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label={PropsDefaultRecordStore.type.label}
                        className="custom-des-form-input"
                        name={PropsDefaultRecordStore.type.key}
                        rules={[]}
                      >
                        <Select
                          defaultValue={"pop"}
                          options={[
                            { label: "Pop", value: "pop" },
                            { label: "Ballad", value: "ballad" },
                            { label: "Rock", value: "rock" },
                            { label: "EDM", value: "edm" },
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col
              span={2}
              style={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <div
                className="page__body-modify-container"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <div
                  className="page__body-modify-container-icon"
                  style={{ color: "red" }}
                >
                  {images.icon.delete}
                </div>
                <div
                  className="page__body-modify-container-label"
                  onClick={() => {}}
                >
                  Xóa bản ghi
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div
              className="btn-wrap"
              style={{ alignItems: "center", marginTop: 30 }}
            >
              <Button
                className="cancel"
                onClick={() => {
                  // setIsUpdateProfile(false);
                }}
              >
                Hủy bỏ
              </Button>
              <Button
                className="confirm"
                htmlType="submit"
                form="userProfileForm"
              >
                Lưu
              </Button>
            </div>
          </Row>
        </Form>
      </div>
    </div>
  );
}
