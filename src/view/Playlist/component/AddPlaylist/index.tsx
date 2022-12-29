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
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../../../shared/assets/images";
import { avtUrl } from "../../../RecordStore/component/DefaultRecordStore";
import TableAddPlaylist from "./TableAddPlaylist";
import "./styles.scss";
import AddRecordsToPlaylist from "./AddRecordsToPlaylist";

export default function AddPlaylist() {
  const [isAddRecordsToPlaylist, setIsAddRecordsToPlaylist] =
    useState<boolean>(false);
  const [form] = Form.useForm();
  const handleAddRecords = () => {
    setIsAddRecordsToPlaylist(true);
  };
  return (
    <>
      {isAddRecordsToPlaylist ? (
        <>
          <AddRecordsToPlaylist />
        </>
      ) : (
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
                  <div className="page__body-playlist-image">
                    <div>{images.temp.defaultPlaylist}</div>
                    <span>{images.icon.more}</span>
                  </div>

                  <Form.Item
                    label={
                      <>
                        <span>Tiêu đề:</span> <span className="red">*</span>
                      </>
                    }
                    name="userLastname"
                    rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
                  >
                    <Input maxLength={100} />
                  </Form.Item>
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
                    <TextArea maxLength={100} />
                  </Form.Item>
                  <Divider />
                  <Form.Item label={"Chủ đề"} name="userLastname" rules={[]}>
                    <Select
                      placeholder="Nhập chủ đề"
                      mode="tags"
                      tokenSeparators={[",", " "]}
                      defaultOpen={false}
                      onChange={(value) => {}}
                      dropdownRender={() => <></>}
                      dropdownStyle={{ display: "none" }}
                    />
                  </Form.Item>
                  <div className="wrap-switch">
                    <Switch />
                    <span>Chế độ công khai</span>
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
      )}
    </>
  );
}
