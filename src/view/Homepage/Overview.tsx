import { ArrowDownOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/AntdIcon";
import { Badge, Card, Col, Row, Space, Typography } from "antd";
import { useMemo } from "react";
import { images } from "../../shared/assets/images";
import { useAppSelector } from "../../shared/hooks";

import CalendarOverview from "./Calendar/CalendarOverview";
import RadialChart from "./Chart/RadialChart";

import "./Homepage.scss";

export default function Overview() {
  const devices = useAppSelector((state) => state.device.devices);
  const services = useAppSelector((state) => state.service.services);
  const numbers = useAppSelector(
    (state) => state.provideNumbers.provideNumbers
  );
  const handleStaticDevices = () => {
    const deviceProps = {
      active: 0,
      inactive: 0,
    };
    if (devices?.length) {
      devices.forEach(
        (
          device:
            | {
                statusActive: {
                  id: string;
                  deviceId: string;
                  deviceName: string;
                  deviceIp: string;
                  statusActive: string;
                  statusConect: string;
                  deviceService: string;
                };
              }
            | any
        ) => {
          device.statusActive === "active"
            ? deviceProps.active++
            : deviceProps.inactive++;
        }
      );
    }
    return deviceProps;
  };

  const handleStaticServices = () => {
    const serviceProps = {
      active: 0,
      inactive: 0,
    };
    if (services?.length > 0) {
      services.forEach(
        (service: {
          id: string;
          serviceId: string;
          serviceName: string;
          serviceDescription: string;
          serviceStatusActive: string;
          serviceService: string;
        }) => {
          service?.serviceStatusActive === "active"
            ? serviceProps.active++
            : serviceProps.inactive++;
        }
      );
    }
    return serviceProps;
  };

  const handleStaticProvideNums = () => {
    const numsProps = {
      waiting: 0,
      used: 0,
      skipped: 0,
    };

    if (numbers?.length > 0) {
      numbers.forEach((number: { statusCreateNumbers: string }) => {
        if (number.statusCreateNumbers === "waiting") {
          numsProps.waiting++;
        }
        if (number.statusCreateNumbers === "used") {
          numsProps.used++;
        }
        if (number.statusCreateNumbers === "skipped") {
          numsProps.skipped++;
        }
      });
    }
    return numsProps;
  };
  const deviceProps = useMemo(handleStaticDevices, [devices]);
  const numsProps = useMemo(handleStaticProvideNums, [numbers]);
  const serviceProps = useMemo(handleStaticServices, [services]);
  return (
    <div
      className="homepage__wrap"
      style={{ paddingLeft: "24px", paddingRight: "24px", height: "93vh" }}
    >
      <Row>
        <Typography.Title className="homepage__title">
          Tổng quan
        </Typography.Title>
      </Row>
      <Row className="homepage__overview-chart-wrap">
        <div className="homepage__overview-chart">
          <RadialChart
            color="#ff7506"
            field1={deviceProps.active}
            field2={deviceProps.inactive}
          />
        </div>
        <Col span={7} className={"homepage__overview-chart-total"}>
          <span className="homepage__overview-chart-total-num">
            {devices?.length}
          </span>
          <div className="homepage__overview-chart-total-title orange">
            {images.icon.device}
            <span>Thiết bị</span>
          </div>
        </Col>
        <Col span={9} className="homepage__overview-information">
          <div className="homepage__overview-information-title">
            <div>
              <Badge color="#f50" text="Đang hoạt động" />
            </div>
            <div>
              <Badge color="#f50" text="Ngưng hoạt động" />
            </div>
          </div>
        </Col>
        <Col span={3} className="homepage__overview-information-num">
          <div className="homepage__overview-information-num">
            <div>{deviceProps.active}</div> <div>{deviceProps.inactive}</div>
          </div>
        </Col>
      </Row>
      <Row className="homepage__overview-chart-wrap">
        <div className="homepage__overview-chart">
          <RadialChart
            color="#4277ff"
            field1={serviceProps.active}
            field2={serviceProps.inactive}
          />
        </div>
        <Col span={7} className={"homepage__overview-chart-total"}>
          <span className="homepage__overview-chart-total-num">
            {services?.length}
          </span>
          <div className="homepage__overview-chart-total-title blue">
            {images.icon.service}
            <span>Dịch vụ</span>
          </div>
        </Col>
        <Col span={9} className="homepage__overview-information">
          <div className="homepage__overview-information-title">
            <div>
              <Badge color="#f50" text="Đang hoạt động" />
            </div>
            <div>
              <Badge color="#f50" text="Ngưng hoạt động" />
            </div>
          </div>
        </Col>
        <Col span={3} className="homepage__overview-information-num">
          <div className="homepage__overview-information-num blue">
            <div>{serviceProps.active}</div> <div>{serviceProps.inactive}</div>
          </div>
        </Col>
      </Row>

      <Row className="homepage__overview-chart-wrap">
        <div className="homepage__overview-chart">
          <RadialChart
            color="#35c75a"
            field1={numsProps.used}
            field2={numsProps.waiting}
            field3={numsProps.skipped}
          />
        </div>
        <Col span={7} className={"homepage__overview-chart-total"}>
          <span className="homepage__overview-chart-total-num">
            {numbers?.length}
          </span>
          <div className="homepage__overview-chart-total-title green">
            {images.icon.nums}
            <span>Cấp số</span>
          </div>
        </Col>
        <Col span={9} className="homepage__overview-information">
          <div className="homepage__overview-information-title">
            <div>
              <Badge color="#f50" text="Đã sử dụng" />
            </div>
            <div>
              <Badge color="#f50" text="Đang chờ" />
            </div>
            <div>
              <Badge color="#f50" text="Đang chờ" />
            </div>
          </div>
        </Col>
        <Col span={3} className="homepage__overview-information-num">
          <div className="homepage__overview-information-num green">
            <div>{numsProps.used}</div> <div>{numsProps.waiting}</div>{" "}
            <div>{numsProps.skipped}</div>
          </div>
        </Col>
      </Row>

      <Row className="homepage__calendar" style={{ height: 100 }}>
        <CalendarOverview />
      </Row>
    </div>
  );
}
