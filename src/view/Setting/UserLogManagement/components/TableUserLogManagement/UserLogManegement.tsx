import { Col, Row, Select, Typography } from "antd";
import Search from "antd/lib/input/Search";

import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Moment } from "moment";
import { useAppDispatch } from "../../../../../shared/hooks";
import TableUserLogManegement from ".";

import { getUserLogs } from "../../../../../modules/setting/userLog/respository";

const { RangePicker } = DatePicker;
type RangeValue = [Moment | null, Moment | null] | null;
export default function UserLogManegement() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    dispatch(getUserLogs());
  }, []);

  return (
    <div className="devicepage">
      <Row className="devicepage__filter">
        <Col span={22} style={{ display: "flex" }}>
          <div className="devicepage__filter-item">
            <Typography.Title
              level={5}
              className="devicepage__filter-item-title"
            >
              Chọn thời gian
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
          <TableUserLogManegement />
        </Col>
      </Row>
    </div>
  );
}
