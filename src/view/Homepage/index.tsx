import { ArrowDownOutlined } from "@ant-design/icons";
import { Col, Row, Select, Tag, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import { useEffect, useMemo, useState } from "react";
import { images } from "../../shared/assets/images";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { getDevices } from "../../modules/device/respository";
import { provideNumbersStore } from "../../modules/provideNumbers/provideNumbersStore";
import { getProvideNumbers } from "../../modules/provideNumbers/respository";
import { getServices } from "../../modules/service/respository";
import { serviceStore } from "../../modules/service/serviceStore";
import Chart from "./Chart";
import "./Homepage.scss";

type timeProps = "day" | "week" | "month";
export default function Homepage() {
  const dispatch = useAppDispatch();
  const devices = useAppSelector((state) => state.device.devices);
  const services = useAppSelector((state) => state.service.services);
  const numbers = useAppSelector(
    (state) => state.provideNumbers.provideNumbers
  );
  const [today] = useState(new Date());
  const [timeFilter, setTimeFilter] = useState<timeProps>("day");
  useEffect(() => {
    if (!devices || devices?.length === 0) dispatch(getDevices());
    if (!services || services?.length === 0)
      getServices().then((serviceSnap) => {
        dispatch(serviceStore.actions.fetchService({ services: serviceSnap }));
      });
    if (!numbers || numbers?.length === 0)
      getProvideNumbers().then((number) => {
        dispatch(
          provideNumbersStore.actions.fetchprovideNumbers({
            provideNumbers: number,
          })
        );
      });
  }, []);

  const handleStaticProvideNumbers = () => {
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

  const staticFilterByTime = ({ time }: { time: timeProps }) => {
    let data: any = {};
    if (time === "day") {
      data = numbers.reduce(
        (
          result: any,
          currentValue: {
            createdAt: {
              nanoseconds: number;
              seconds: number;
            };
          }
        ) => {
          const today = new Date();
          const date = new Date(currentValue.createdAt.seconds * 1000);
          if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth()
          ) {
            if (result[date.getDate()]) {
              result[date.getDate()] = {
                scales: result[date.getDate()].scales + 1,
                time: date.getDate().toString(),
              };
            } else {
              result[date.getDate()] = {
                scales: 1,
                time: date.getDate().toString(),
              };
            }
          }

          // currentValue.createdAt.seconds;
          return result;
        },
        {}
      );
    }

    if (time === "week") {
      data = numbers.reduce(
        (
          result: any,
          currentValue: {
            createdAt: {
              nanoseconds: number;
              seconds: number;
            };
          }
        ) => {
          const today = new Date();
          const date = new Date(currentValue.createdAt.seconds * 1000);
          if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth()
          ) {
            if (date.getDate() > 0 && date.getDate() < 8) {
              result["week1"] =
                result["week1"]?.scales > 0
                  ? {
                      scales: result["week1"].scales + 1,
                      time: "Tuần 1",
                    }
                  : {
                      scales: 1,
                      time: "Tuần 1",
                    };
            }

            if (date.getDate() > 7 && date.getDate() < 15) {
              result["week2"] =
                result["week2"]?.scales > 0
                  ? {
                      scales: result["week2"].scales + 1,
                      time: "Tuần 2",
                    }
                  : {
                      scales: 1,
                      time: "Tuần 2",
                    };
            }

            if (date.getDate() > 14 && date.getDate() < 22) {
              result["week3"] =
                result["week3"]?.scales > 0
                  ? {
                      scales: result["week3"].scales + 1,
                      time: "Tuần 3",
                    }
                  : {
                      scales: 1,
                      time: "Tuần 3",
                    };
            }

            if (date.getDate() > 21) {
              result["week4"] =
                result["week4"]?.scales > 0
                  ? {
                      scales: result["week4"].scales + 1,
                      time: "Tuần 4",
                    }
                  : {
                      scales: 1,
                      time: "Tuần 4",
                    };
            }
          }

          // currentValue.createdAt.seconds;
          return result;
        },
        { week1: {}, week2: {}, week3: {}, week4: {} }
      );
    }

    if (time === "month") {
      data = numbers.reduce(
        (
          result: any,
          currentValue: {
            createdAt: {
              nanoseconds: number;
              seconds: number;
            };
          }
        ) => {
          const today = new Date();
          const date = new Date(currentValue.createdAt.seconds * 1000);
          if (date.getFullYear() === today.getFullYear()) {
            result[date.getMonth() + 1] = result[date.getMonth() + 1]
              ? {
                  scales: result[date.getMonth() + 1].scales + 1,
                  time: (date.getMonth() + 1).toString(),
                }
              : {
                  scales: 1,
                  time: (date.getMonth() + 1).toString(),
                };
          }

          // currentValue.createdAt.seconds;
          return result;
        },
        {}
      );
    }
    return Object.values(data);
  };

  const handleChangeFilter = (value: timeProps) => {
    setTimeFilter(value);
  };

  const numsProps = useMemo(handleStaticProvideNumbers, [numbers]);
  const staticData = useMemo(
    () => staticFilterByTime({ time: timeFilter }),
    [timeFilter, numbers]
  );
  return (
    <>
      <div className="homepage__wrap">
        <Row>
          <Typography.Title className="homepage__title">
            Biểu đồ cấp số
          </Typography.Title>
        </Row>
        <Row className="homepage__list-information" gutter={13}>
          <Col span={6} className="homepage__item-information">
            <div className="homepage__item-information-card">
              <div className="homepage__item-information-card-head">
                <div className="homepage__item-information-card-head-icon">
                  {images.icon.numericalorder}
                </div>
                <span className="homepage__item-information-card-head-title">
                  Số thứ tự đã cấp
                </span>
              </div>
              <div className="homepage__item-information-card-body">
                <span className="homepage__item-information-card-body-number">
                  {numbers.length}
                </span>
                <Tag
                  className="homepage__item-information-card-body-percen"
                  icon={<ArrowDownOutlined />}
                >
                  32.4%
                </Tag>
              </div>
            </div>
          </Col>
          <Col span={6} className="homepage__item-information">
            <div className="homepage__item-information-card">
              <div className="homepage__item-information-card-head">
                <div className="homepage__item-information-card-head-icon">
                  {images.icon.numericalorderused}
                </div>
                <span className="homepage__item-information-card-head-title">
                  Số thứ tự đã sử dụng
                </span>
              </div>
              <div className="homepage__item-information-card-body">
                <span className="homepage__item-information-card-body-number">
                  {numsProps.used}
                </span>
                <Tag
                  className="homepage__item-information-card-body-percen"
                  icon={<ArrowDownOutlined />}
                >
                  32.4%
                </Tag>
              </div>
            </div>
          </Col>
          <Col span={6} className="homepage__item-information">
            <div className="homepage__item-information-card">
              <div className="homepage__item-information-card-head">
                <div className="homepage__item-information-card-head-icon">
                  {images.icon.numericalorderwait}
                </div>
                <span className="homepage__item-information-card-head-title">
                  Số thứ tự đang chờ
                </span>
              </div>
              <div className="homepage__item-information-card-body">
                <span className="homepage__item-information-card-body-number">
                  {numsProps.waiting}
                </span>
                <Tag
                  className="homepage__item-information-card-body-percen"
                  icon={<ArrowDownOutlined />}
                >
                  32.4%
                </Tag>
              </div>
            </div>
          </Col>
          <Col span={6} className="homepage__item-information">
            <div className="homepage__item-information-card">
              <div className="homepage__item-information-card-head">
                <div className="homepage__item-information-card-head-icon">
                  {images.icon.numericalorderskiped}
                </div>
                <span className="homepage__item-information-card-head-title">
                  Số thứ tự đã bỏ qua
                </span>
              </div>
              <div className="homepage__item-information-card-body">
                <span className="homepage__item-information-card-body-number">
                  {numsProps.skipped}
                </span>
                <Tag
                  className="homepage__item-information-card-body-percen"
                  icon={<ArrowDownOutlined />}
                >
                  32.4%
                </Tag>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="homepage__chart">
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>
              <Typography.Title className="homepage__chart-title">
                {timeFilter === "day" && "Thống kê theo ngày"}
                {timeFilter === "week" && "Thống kê theo tuần"}
                {timeFilter === "month" && "Thống kê theo tháng"}
              </Typography.Title>
              <Typography.Text className="homepage__chart-month">
                {(timeFilter === "day" || timeFilter === "week") &&
                  `Xem theo tháng ${
                    today.getMonth() + 1
                  } / ${today.getFullYear()} `}
                {timeFilter === "month" &&
                  `Xem theo năm ${today.getFullYear()}`}
              </Typography.Text>
            </Typography>
            <div className="filter__wrap">
              <Typography.Text className="filter__wrap-title">
                Xem theo
              </Typography.Text>
              <Select
                suffixIcon={images.icon.arrow}
                className="filter__wrap-select"
                // defaultValue={"day"}
                placeholder="Lọc theo"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={handleChangeFilter}
                defaultValue="day"
              >
                <Option value="day">Ngày</Option>
                <Option value="week">Tuần</Option>
                <Option value="month">Tháng</Option>
              </Select>
            </div>
          </Row>
          <Chart staticData={staticData} />
        </Row>
      </div>
    </>
  );
}
