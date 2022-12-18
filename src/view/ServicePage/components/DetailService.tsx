import { Button, Checkbox, Col, Form, Row, Typography } from "antd";
import { Select } from "antd";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Moment } from "moment";
import { images } from "../../../shared/assets/images";
import TableCreateNumbers from "./TableService/CreateNumbers";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getNumbersProvidedbyService } from "../../../modules/service/respository";
import { serviceStore } from "../../../modules/service/serviceStore";
type RangeValue = [Moment | null, Moment | null] | null;
const { RangePicker } = DatePicker;

const labelFormDevice = {
  serviceId: {
    label: "Mã dịch vụ",
  },
  serviceName: {
    label: "Tên dịch vụ",
  },
  serviceDescription: {
    label: "Mô tả",
  },
};
export default function DetailService() {
  const [form] = Form.useForm();
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const services: Array<any> | undefined = useAppSelector((state) => {
    return state.service.services;
  });
  const service = services?.find((value) => value.id == id);

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
    getNumbersProvidedbyService({ id: id }).then((numbers) => {
      dispatch(
        serviceStore.actions.fetchNumbersProvidedbyService({
          numbersProvidedbyService: numbers,
        })
      );
    });
  }, []);
  return (
    <div className="wrap-page">
      <Row className="page-title">
        <Typography.Title>Quản lý thiết bị</Typography.Title>
      </Row>

      <Row className="page-body-detail">
        <div className="page-description">
          <Row>
            <div>
              <div>
                <Typography.Title level={4} className="page-description-title">
                  Thông tin dịch vụ
                </Typography.Title>
              </div>

              <div className="page-description-item">
                <div className="label">Mã dịch vụ</div>
                <div className="content">{service?.serviceId}</div>
              </div>
              <div className="page-description-item">
                <div className="label">Tên dịch vụ</div>
                <div className="content">{service?.serviceName}</div>
              </div>
              <div className="page-description-item">
                <div className="label">Mô tả</div>
                <div className="content">{service?.serviceDescription}</div>
              </div>

              <div>
                <Typography.Title level={4} className="page-description-title">
                  Quy tắc cấp số
                </Typography.Title>
              </div>
              {service?.autoIncrease ? (
                <div className="page-description-item">
                  <div className="label">Tăng tự động</div>
                  <div className="content">
                    <span className="box">0001</span>
                    <span>đến</span>
                    <span className="box">1000</span>
                  </div>
                </div>
              ) : null}
              {service?.surFix ? (
                <div className="page-description-item">
                  <div className="label">Surfix</div>
                  <div className="content">
                    <span className="box">0001</span>
                  </div>
                </div>
              ) : null}
              {service?.preFix ? (
                <div className="page-description-item">
                  <div className="label">Prefix</div>
                  <div className="content">
                    <span className="box">0001</span>
                  </div>
                </div>
              ) : null}
              {service?.resetEveryday ? (
                <div className="page-description-item">
                  <div className="label">Reset mỗi ngày</div>
                </div>
              ) : null}
            </div>
          </Row>
        </div>
        <div className="page-create-number">
          <Row className="devicepage__filter">
            <Col span={24} style={{ display: "flex" }}>
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
            <Col span={24} className="devicepage__body-table">
              <TableCreateNumbers />
            </Col>
          </Row>
        </div>
        <div>
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
        </div>
      </Row>
    </div>
  );
}
