import {
  Badge,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { images } from "../../../../shared/assets/images";
import TableAddPlaylist from "../AddPlaylist/TableAddPlaylist";
import "./styles.scss";

function DetailPlaylist() {
  const [form] = Form.useForm();
  const handleAddRecords = () => {};
  return (
    <>
      <div className="page">
        <Row className="page__title">
          <Typography.Title>Playlist</Typography.Title>
        </Row>

        <Row className="page__body playlist-add playlist-detail">
          <Col span={5} style={{ paddingRight: "25px" }}>
            <Form
              name="userProfileForm"
              layout="vertical"
              requiredMark={false}
              form={form}
              id="userProfileForm"
              onFinish={() => {}}
            >
              <div className="page__body-playlist-image">
                <div>{images.temp.defaultPlaylist}</div>
                <span>{images.icon.more}</span>
              </div>

              <div className="playlist-detail-title">
                <span>Top ca khúc năm 2022</span>
              </div>
              <div className="wrap-box">
                <div>
                  <span>Người tải lên</span>
                  <span>Phạm Thanh Sơn</span>
                </div>
                <div>
                  <span>Tổng số</span>
                  <span>8</span>
                </div>
                <div>
                  <span>Tổng thời lượng</span>
                  <span>01:50:30</span>
                </div>
              </div>
              <Form.Item label={"Mô tả:"} name="userLastname" rules={[]}>
                <span className="playlist-detail-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt labore et dolore magna aliqua.
                </span>
              </Form.Item>
              <Divider />
              <Form.Item label={"Chủ đề"} name="userLastname" rules={[]}>
                <div className="playlist-detail-text">
                  <Badge status="processing" text={"Chuẩn rồi"} />
                  <Badge status="processing" text={"Chuẩn rồi"} />
                  <Badge status="processing" text={"Chuẩn rồi"} />
                  <Badge status="processing" text={"Chuẩn rồi"} />
                </div>
              </Form.Item>
              <Divider />
              <div className="wrap-switch">
                <span>Hiển thị ở chế độ công khai</span>
              </div>
              <div className="wrap-switch">
                <span>Phát ngẫu nhiên</span>
              </div>
              <div className="wrap-switch">
                <span>Lặp lại</span>
              </div>
              <div className="note">
                <span>*</span>
                <span>Là những trường thông tin bắt buộc</span>
              </div>
            </Form>
          </Col>
          <Col span={17} className="page__body-table">
            <TableAddPlaylist
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

export default DetailPlaylist;
