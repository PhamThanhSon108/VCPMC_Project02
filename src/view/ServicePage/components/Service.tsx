import { Col, Row, Select, Typography } from "antd";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../shared/assets/images";
import TableDevice from "../../DevicePage/components/TableDevice";
import type { Moment } from "moment";
import ServiceTable from "./TableService/ServiceTable";
import { getServices } from "../../../modules/service/respository";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { serviceStore } from "../../../modules/service/serviceStore";
const { RangePicker } = DatePicker;
type RangeValue = [Moment | null, Moment | null] | null;
export default function Service() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const services = useAppSelector((state) => state.service.services);

  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const disabledDate = (current: Moment) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 50;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 50;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  useEffect(() => {
    getServices().then((serviceSnap) => {
      dispatch(serviceStore.actions.fetchService({ services: serviceSnap }));
    });
  }, []);
  return (
    <div className="devicepage">
      <Row className="devicepage__title">
        <Typography.Title>Quản lý dịch vụ</Typography.Title>
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
              suffixIcon={images.icon.arrow}
              className="devicepage__filter-item-body"
              defaultValue={"Tất cả"}
            >
              <Option value="">Tất cả</Option>
              <Option value="1">Hoạt động</Option>
              <Option value="2">Ngưng hoạt động</Option>
            </Select>
          </div>

          <div className="devicepage__filter-item">
            <Typography.Title
              level={5}
              className="devicepage__filter-item-title"
            >
              Trạng thái kết nối
            </Typography.Title>
            <RangePicker
              value={dates || value}
              disabledDate={disabledDate}
              onCalendarChange={(val) => setDates(val)}
              onChange={(val) => setValue(val)}
              onOpenChange={onOpenChange}
            />
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
          <ServiceTable />
        </Col>
        <Col span={2} className="devicepage__body-modify">
          <div className="devicepage__body-modify-container">
            <div className="devicepage__body-modify-container-icon">
              {images.icon.addDevice}
            </div>
            <Link
              to={"add"}
              className="devicepage__body-modify-container-label"
            >
              Thêm dịch vụ
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
