import {
  Col,
  Form,
  Row,
  Typography,
  Input,
  Image,
  Switch,
  Select,
  Divider,
  Button,
  DatePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../../../shared/assets/images";
import TableUpdateSchedule from "./TableUpdateSchedule";
import "./styles.scss";
export default function UpdateSchedule() {
  const [isAddRecordsToPlaylist, setIsAddRecordsToPlaylist] =
    useState<boolean>(false);
  const [form] = Form.useForm();
  const handleAddRecords = () => {
    setIsAddRecordsToPlaylist(true);
  };
  return (
    <>
      <div className="page">
        <Row className="page__title">
          <Typography.Title>Playlist</Typography.Title>
        </Row>

        <Row className="page__body playlist-add">
          <Col span={5} style={{ paddingRight: "25px" }}>
            <Form
              name="userProfileForm"
              layout="vertical"
              requiredMark={false}
              form={form}
              id="userProfileForm"
              onFinish={() => {}}
            >
              <Form.Item
                label={
                  <>
                    <span>Tên lịch phát:</span> <span className="red">*</span>
                  </>
                }
                name="userLastname"
                rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
              >
                <Input maxLength={100} />
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
                <DatePicker />
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
                <DatePicker />
              </Form.Item>
              <div
                style={{
                  background: "rgba(47, 47, 65, 0.7)",
                  borderRadius: "16px",
                  padding: "7px 1px 7px 10px ",
                }}
              >
                <div className="update-schedule-wrap">
                  <div className="update-schedule-list">
                    <div className="update-schedule-list-title">
                      Danh sách Playlist
                    </div>
                    <div className="update-schedule-item">
                      <span>Top USUK</span>
                      <div className="update-schedule-item-body">
                        <span>Thời lượng</span>
                        <span>02:00:00</span>
                      </div>
                    </div>
                    <div className="update-schedule-item">
                      <span>Top USUK</span>
                      <div className="update-schedule-item-body">
                        <span>Thời lượng</span>
                        <span>02:00:00</span>
                      </div>
                    </div>
                    <Divider />
                  </div>
                  <div className="update-schedule-list">
                    <div className="update-schedule-list-title">
                      Danh sách Playlist
                    </div>
                    <div className="update-schedule-item">
                      <span>Top USUK</span>
                      <div className="update-schedule-item-body">
                        <span>Thời lượng</span>
                        <span>02:00:00</span>
                      </div>
                    </div>
                    <div className="update-schedule-item">
                      <span>Top USUK</span>
                      <div className="update-schedule-item-body">
                        <span>Thời lượng</span>
                        <span>02:00:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Col>
          <Col span={17} className="page__body-table">
            <TableUpdateSchedule
              statusActive={"all"}
              statusConect={"all"}
              keyWord={""}
            />
            <div
              className="btn-wrap"
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button className="cancel">Hủy bỏ</Button>
              <Button
                className="confirm"
                htmlType="submit"
                form="changePasswordForm"
              >
                Lưu
              </Button>
            </div>
          </Col>
          <Col span={2} className="page__body-modify">
            <div className="page__body-modify-container">
              <div className="page__body-modify-container-icon">
                {images.icon.addDevice}
              </div>
              <div
                className="page__body-modify-container-label"
                onClick={handleAddRecords}
              >
                Thêm bản ghi
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
