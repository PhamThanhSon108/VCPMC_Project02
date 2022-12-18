import {
  Badge,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../shared/hooks";
import { addDevice } from "../../../modules/device/respository";

import { v4 as uuidv4 } from "uuid";
import { Option } from "antd/lib/mentions";
import TextArea from "antd/lib/input/TextArea";
import "../Service.scss";
import { addService } from "../../../modules/service/respository";
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
const DeviceTypeOption = ["Kiosk", "Display counter"];
const DeviceServiceOption = [
  "Khám tim mạch",
  "Khám sản phụ khoa",
  "Khám răng hàm mặt",
  "Khám tai mũi họng",
  "Khám hô hấp",
  "Khám tổng quát",
];
type deviceProps = {
  setStatus?: (value: string) => void;
};
export default function AddService() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleCancel = () => {
    navigate("/service");
  };
  const handleAddDevice = () => {};
  const handleOnfinish = (data: any) => {
    data.surFix = !!data.surFix;
    data.resetEveryday = !!data.resetEveryday;
    data.autoIncrease = !!data.autoIncrease;
    data.preFix = !!data.preFix;
    addService({ service: data, id: uuidv4() }).then(() => {
      navigate("/service");
    });
  };
  return (
    <div className="wrap-page">
      <Row className="page-title">
        <Typography.Title>Quản lý dịch vụ</Typography.Title>
      </Row>

      <Row className="wrap-page__add">
        <div>
          <Form
            name="addServiceForm"
            layout="vertical"
            form={form}
            id="addServiceForm"
            onFinish={handleOnfinish}
          >
            <Row>
              <div>
                <Typography.Title level={4} className="add-device__form-title">
                  Thông tin dịch vụ
                </Typography.Title>
              </div>
            </Row>
            <Row className="add-device__form-box">
              <Col style={{ marginRight: 24 }}>
                <div className="main-form">
                  <Form.Item
                    label={labelFormDevice.serviceId.label}
                    name="serviceId"
                    rules={[
                      {
                        required: true,
                      },
                      {
                        max: 99,
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      // placeholder={formatMessage('accounts.userName')}
                      maxLength={100}
                    />
                  </Form.Item>
                  <Form.Item
                    label={labelFormDevice.serviceName.label}
                    name="serviceName"
                    rules={[
                      {
                        required: true,
                      },
                      {
                        max: 99,
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      // placeholder={formatMessage('accounts.userName')}
                      maxLength={100}
                    />
                  </Form.Item>
                </div>
              </Col>

              <Col>
                <div className="main-form">
                  <Form.Item
                    label={labelFormDevice.serviceDescription.label}
                    name="serviceDescription"
                    style={{ height: "100%" }}
                    rules={[
                      {
                        required: true,
                      },
                      {
                        max: 99,
                        whitespace: true,
                      },
                    ]}
                  >
                    <TextArea
                      style={{ height: 145 }}
                      // placeholder={formatMessage('accounts.userName')}
                      maxLength={100}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <div>
                <Typography.Title level={4} className="add-device__form-title">
                  Quản lý cấp số
                </Typography.Title>
              </div>
            </Row>
            <Row>
              <Col span={24}>
                <div className="">
                  <Form.Item
                    valuePropName="checked"
                    name="autoIncrease"
                    rules={[]}
                  >
                    <Checkbox>
                      <div>Tăng tự động</div>
                      <span className="box">0001</span>
                      <span>đến</span>
                      <span className="box">1000</span>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item name="surFix" rules={[]} valuePropName="checked">
                    <Checkbox>
                      <div>Surfix</div>
                      <span className="box">0001</span>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item name="preFix" rules={[]} valuePropName="checked">
                    <Checkbox>
                      <div>Prefix</div>
                      <span className="box">0001</span>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="resetEveryday"
                    valuePropName="checked"
                    rules={[]}
                  >
                    <Checkbox>Reset mỗi ngày</Checkbox>
                  </Form.Item>
                </div>
              </Col>
              <span style={{ textAlign: "start" }}>
                <span style={{ color: "red", marginRight: "5px" }}>*</span>
                Là trường thông tin bắt buộc
              </span>
            </Row>
          </Form>
        </div>
      </Row>

      <Row>
        <div className="add-device__btn-wrap">
          <Button className="cancel" onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button className="confirm" htmlType="submit" form="addServiceForm">
            Thêm dịch vụ
          </Button>
        </div>
      </Row>
    </div>
  );
}
