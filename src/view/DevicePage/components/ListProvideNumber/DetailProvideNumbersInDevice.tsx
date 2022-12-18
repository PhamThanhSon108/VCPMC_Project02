import { Col, Row, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { images } from "../../../../shared/assets/images";
import { useEffect, useState } from "react";
import { getDetailProvideNumberOfDevice } from "../../../../modules/device/respository";
import { formatDate } from "../../../ProvideNumbersPage/component/TableProvideNumbers/TableProvideNumbers";

const labelDetailProvideNumbers = {
  customerName: {
    label: "Họ và tên",
  },
  customerPhoneNumber: {
    label: "Số điện thoại",
  },
  customerEmail: {
    label: "Địa chỉ Email",
  },
  serviceName: {
    label: "Tên dịch vụ",
  },
  ordinalNumbers: {
    label: "Số thứ tự",
  },
  createdTime: {
    label: "Thời gian cấp",
  },
  expiredTime: {
    label: "Hạn sử dụng",
  },
  provideSource: {
    label: "Nguồn cấp",
  },
  statusCreateNumbers: {
    label: "Trạng thái",
  },
};
type NumberProvideProps =
  | {
      id: string;
      ordinalNumbers: string;
      customerName: string;
      serviceName: string;
      createdTime: string;
      expiredTime: string;
      statusCreateNumbers: string;
      supplySource: string;
    }
  | undefined;
export default function DetailProvideNumbersInDevice() {
  const { id } = useParams();
  const [number, setNumber] = useState<NumberProvideProps>();
  useEffect(() => {
    getDetailProvideNumberOfDevice({ id }).then((numberProvide) => {
      setNumber({
        id: numberProvide?.id,
        ordinalNumbers: numberProvide?.service?.option?.preFix
          ? numberProvide?.ordinalNumbers + numberProvide?.service?.serviceId
          : numberProvide?.service?.serviceId + numberProvide?.ordinalNumbers,
        customerName: numberProvide?.customerName,
        serviceName: numberProvide?.service?.serviceName,
        createdTime: formatDate(numberProvide?.createdAt.seconds),
        expiredTime: formatDate(numberProvide?.createdAt.seconds, true),
        statusCreateNumbers: "waiting",
        supplySource: numberProvide?.device?.deviceName,
      });
    });
  }, [id]);
  return (
    <div className="devicepage">
      <Row className="devicepage__title">
        <Typography.Title>Quản lý thiết bị</Typography.Title>
      </Row>
      <Row className="devicepage__body">
        <Col span={22} className="detail__page">
          <div className="detail__page-title">Thông tin cấp số</div>
          <Row className="detail__page-wrap">
            <div className={"detail__page-list"}>
              <div>
                <span>{labelDetailProvideNumbers.customerName?.label}</span>
                <span>{number?.customerName}</span>
              </div>
              <div>
                <span>{labelDetailProvideNumbers.serviceName?.label}</span>
                <span>{number?.serviceName}</span>
              </div>
              <div>
                <span>{labelDetailProvideNumbers.ordinalNumbers?.label}</span>
                <span>{number?.ordinalNumbers}</span>
              </div>
              <div>
                <span>{labelDetailProvideNumbers.createdTime?.label}</span>
                <span>{number?.createdTime}</span>
              </div>
              <div>
                <span>{labelDetailProvideNumbers.expiredTime?.label}</span>
                <span>{number?.expiredTime}</span>
              </div>
            </div>
            <div className={"detail__page-list"}>
              <div>
                <span>{labelDetailProvideNumbers.provideSource?.label}</span>
                <span>{number?.supplySource}</span>
              </div>
              <div>
                <span>
                  {labelDetailProvideNumbers.statusCreateNumbers?.label}
                </span>
                <span>{number?.statusCreateNumbers}</span>
              </div>
              <div>
                <span>
                  {labelDetailProvideNumbers.customerPhoneNumber?.label}
                </span>
                <span>0972513822</span>
              </div>
              <div>
                <span>{labelDetailProvideNumbers.customerEmail?.label}</span>
                <span>Phạm Thanh Sơn</span>
              </div>
            </div>
          </Row>
        </Col>
        <Col span={2} className="devicepage__body-modify">
          <div className="devicepage__body-modify-container">
            <div className="devicepage__body-modify-container-icon">
              {images.icon.addDevice}
            </div>
            <Link
              to={`/device/update/${id}`}
              className="devicepage__body-modify-container-label"
            >
              Quay lại
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
