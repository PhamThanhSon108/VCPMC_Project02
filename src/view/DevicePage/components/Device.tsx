import Search from "antd/lib/input/Search";
import TableDevice from "./TableDevice";
import { Col, Row, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { images } from "../../../shared/assets/images";
import "../DevicePage.scss";

type StatusActiveProps = "active" | "inactive" | "all";
type StatusConect = "conected" | "fail" | "all";
export default function Device() {
  const navigate = useNavigate();
  const [statusActive, setStatusActive] = useState<StatusActiveProps>("all");
  const [statusConect, setStatusConect] = useState<StatusConect>("all");
  const [search, setSearch] = useState<string | undefined>(undefined);

  const handleAddDevice = () => {
    navigate("add");
  };

  const handleChangeStatusActive = useCallback(
    (value: string) => {
      if (value === "active" || value === "inactive" || value === "all")
        setStatusActive(value);
    },
    [statusActive]
  );

  const handleChangeStatusConect = useCallback(
    (value: string) => {
      if (value === "conected" || value === "fail" || value === "all")
        setStatusConect(value);
    },
    [statusConect]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
    },
    [search]
  );

  return (
    <div className="devicepage">
      <Row className="devicepage__title">
        <Typography.Title>Biểu đồ cấp số</Typography.Title>
      </Row>
      <Row className="devicepage__filter">
        <Col span={22} style={{ display: "flex" }}>
          <div className="devicepage__filter-item">
            <Typography.Title
              level={5}
              className="devicepage__filter-item-title"
            >
              Trạng thái hoạt động
            </Typography.Title>
            <Select
              onChange={handleChangeStatusActive}
              suffixIcon={images.icon.arrow}
              className="devicepage__filter-item-body"
              defaultValue={"all"}
            >
              <Option value="all">Tất cả</Option>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Ngưng hoạt động</Option>
            </Select>
          </div>

          <div className="devicepage__filter-item">
            <Typography.Title
              level={5}
              className="devicepage__filter-item-title"
            >
              Trạng thái kết nối
            </Typography.Title>
            <Select
              onChange={handleChangeStatusConect}
              suffixIcon={images.icon.arrow}
              className="devicepage__filter-item-body"
              defaultValue={"Tất cả"}
            >
              <Option value="all">Tất cả</Option>
              <Option value="conected">Kết nối</Option>
              <Option value="fail">Mất kết nối</Option>
            </Select>
          </div>
          <div className="devicepage__filter-last-item">
            <div className="devicepage__filter-item">
              <Typography.Title
                level={5}
                className="devicepage__filter-item-title"
              >
                Từ khóa
              </Typography.Title>
              <Search
                onSearch={handleSearch}
                placeholder="Nhập từ khóa"
                allowClear
                className="devicepage__filter-item-body"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="devicepage__body">
        <Col span={22} className="devicepage__body-table">
          <TableDevice
            statusActive={statusActive}
            statusConect={statusConect}
            keyWord={search}
          />
        </Col>
        <Col span={2} className="devicepage__body-modify">
          <div className="devicepage__body-modify-container">
            <div className="devicepage__body-modify-container-icon">
              {images.icon.addDevice}
            </div>
            <Link
              to={"add"}
              className="devicepage__body-modify-container-label"
              onClick={handleAddDevice}
            >
              Thêm thiết bị
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
