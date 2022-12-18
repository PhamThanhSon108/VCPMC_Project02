import { Col, Row, Select, Typography } from "antd";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import { DatePicker } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../shared/assets/images";
import type { Moment } from "moment";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import TableReport, { formatDate } from "./TableReport";
import { ExportCSV } from "./Excel/ExportCSV";
import moment from "moment";
const { RangePicker } = DatePicker;
type RangeValue = [Moment | null, Moment | null] | null;
const Report: React.FC = () => {
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

  const numbers = useAppSelector(
    (state) => state.provideNumbers.provideNumbers
  );
  moment.defaultFormat = "DD.MM.YYYY HH:mm";
  const data = numbers.map((item: any) => {
    return {
      id: item?.id,
      ordinalNumbers: item?.service?.option?.preFix
        ? item?.ordinalNumbers + item?.service?.serviceId
        : item?.service?.serviceId + item?.ordinalNumbers,
      customerName: item?.customerName,
      serviceName: item?.service?.serviceName,
      createdTime: formatDate(item?.createdAt.seconds),
      expiredTime: formatDate(item?.createdAt.seconds, true),
      statusCreateNumbers: "waiting",
      supplySource: item?.device?.deviceName,
    };
  });

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
        </Col>
      </Row>
      <Row className="devicepage__body">
        <Col span={22} className="devicepage__body-table">
          <TableReport />
        </Col>
        <Col span={2} className="devicepage__body-modify">
          <div className="devicepage__body-modify-container">
            <div className="devicepage__body-modify-container-icon">
              {images.icon.downLoadFile}
            </div>
            <ExportCSV csvData={data} fileName={"report"}>
              <Link to={""} className="devicepage__body-modify-container-label">
                Tải về
              </Link>
            </ExportCSV>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Report;
