import { Col, Row, Typography } from "antd";
import Search from "antd/lib/input/Search";
import { DatePicker } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import type { Moment } from "moment";

import TableRoleManegement from "./TableRoleManegement";
import { images } from "../../../../shared/assets/images";

const { RangePicker } = DatePicker;
type RangeValue = [Moment | null, Moment | null] | null;
export default function RoleManagement() {
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

  return (
    <div className="devicepage">
      <Row className="devicepage__title">
        <Typography.Title>Danh sách vai trò</Typography.Title>
      </Row>
      <Row className="devicepage__filter">
        <Col span={22} style={{ display: "flex" }}>
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
          <TableRoleManegement />
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
              Thêm vai trò
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
