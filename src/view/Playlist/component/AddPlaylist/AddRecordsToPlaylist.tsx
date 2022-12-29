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
import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../../../shared/assets/images";
import { avtUrl } from "../../../RecordStore/component/DefaultRecordStore";
import TableAddPlaylist from "./TableAddPlaylist";
import "./styles.scss";
import SelectFilter from "../../../../shared/components/Select";
import SearchCustom from "../../../../shared/components/Select/SearchCustom";
import TableRecommendRecords from "./TableRecommendRecords";

export default function AddRecordsToPlaylist() {
  const [form] = Form.useForm();
  return (
    <div className="page">
      <Row className="page__title">
        <Typography.Title>Playlist top ca khúc năm 2022</Typography.Title>
      </Row>

      <Row className="page__body playlist-add">
        <Col
          span={11}
          className="page__body-table add-records"
          style={{ marginRight: "15px" }}
        >
          <Row className="page__title">
            <Typography.Text>Kho bản ghi</Typography.Text>
          </Row>
          <Row className="page__filter">
            <Col span={22} style={{ display: "flex" }}>
              <SelectFilter
                onChange={() => {}}
                options={[{ label: "Tất cả", value: "all" }]}
                title="Thể loại:"
                suffixIcon={images.icon.arrow}
              />
              <SelectFilter
                onChange={() => {}}
                options={[{ label: "Tất cả", value: "all" }]}
                title="Playlist mẫu:"
                suffixIcon={images.icon.arrow}
              />{" "}
            </Col>
          </Row>

          <Row className="page__filter">
            <Col span={22} style={{ display: "flex" }}>
              <SearchCustom position="left" title="Từ khóa" allowClear />
            </Col>
          </Row>
          <TableRecommendRecords />
        </Col>
        <Col span={11} className="page__body-table add-records">
          <Row className="page__title">
            <Typography.Text>Kho bản ghi</Typography.Text>
          </Row>
          <Row className="page__filter">
            <Col
              span={22}
              style={{ display: "flex", alignItems: "center", height: "40px" }}
            >
              <div style={{ color: "white", paddingRight: "55px" }}>
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    paddingRight: "10px",
                  }}
                >
                  Tổng số:
                </span>
                <span>16 bản ghi</span>
              </div>
              <div style={{ color: "white", paddingRight: "55px" }}>
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    paddingRight: "10px",
                  }}
                >
                  Tổng số:
                </span>
                <span>16 bản ghi</span>
              </div>
            </Col>
          </Row>
          <Row className="page__filter">
            <Col span={24} style={{ display: "flex" }}>
              <SelectFilter
                onChange={() => {}}
                options={[{ label: "Tất cả", value: "all" }]}
                title="Định dạng:"
                suffixIcon={images.icon.arrow}
              />

              <SearchCustom sort position="right" title="Từ khóa" allowClear />
            </Col>
          </Row>
          <TableAddPlaylist
            statusActive={"all"}
            statusConect={"all"}
            keyWord={""}
          />
        </Col>
      </Row>
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
        <Button className="confirm" htmlType="submit" form="changePasswordForm">
          Lưu
        </Button>
      </div>
    </div>
  );
}
