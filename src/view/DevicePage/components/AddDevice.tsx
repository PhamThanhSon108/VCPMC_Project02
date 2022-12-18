import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../shared/hooks";
import { addDevice } from "../../../modules/device/respository";
import "./AddDevice.scss";
import { v4 as uuidv4, v4 } from "uuid";
import { Option } from "antd/lib/mentions";
import { publicToast } from "../../../components/toast";
import { useMemo } from "react";
const labelFormDevice = {
  deviceId: {
    label: "Mã thiết bị",
  },
  deviceName: {
    label: "Tên thiết bị",
  },
  deviceIp: {
    label: "Địa chỉ IP",
  },
  deviceType: {
    label: "Loại thiết bị",
  },
  deviceNameToLogin: {
    label: "Tên đăng nhập",
  },
  devicePassword: {
    label: "Mật khẩu",
  },
  deviceService: {
    label: "Dịch vụ sử dụng",
  },
};
const DeviceTypeOption = ["Kiosk", "Display counter"];
let DeviceServiceOption: string[] | { name: string; id: string }[] = [
  "Khám tim mạch",
  "Khám sản phụ khoa",
  "Khám răng hàm mặt",
  "Khám tai mũi họng",
  "Khám hô hấp",
  "Khám tổng quát",
];

export default function AddDevice() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const services: Array<{ serviceName: string; id: string }> | undefined =
    useAppSelector((state) => {
      return state.service.services;
    });

  DeviceServiceOption = useMemo(
    () =>
      services.map((value) => ({
        name: value?.serviceName,
        id: value?.id,
      })),
    []
  );
  const handleCancel = () => {
    navigate("/device");
  };
  const handleOnfinish = (data: FormData) => {
    addDevice({ device: data, id: uuidv4() })
      .then(() => {
        navigate("/device");
      })
      .catch((err) => {
        publicToast({
          type: "error",
          message: "Lỗi",
          description: "Có lỗi trong quá trình xử lý",
        });
        navigate("/device");
      });
  };

  return (
    <div className="devicepage">
      <Row className="devicepage__title">
        <Typography.Title>Quản lý thiết bị</Typography.Title>
      </Row>

      <Row className="wrap__add-device">
        <div className="add-device__form">
          <Form
            name="addDeviceForm"
            layout="vertical"
            form={form}
            id="addDeviceForm"
            onFinish={handleOnfinish}
          >
            <Row>
              <div>
                <Typography.Title level={4} className="add-device__form-title">
                  Quản lý thiết bị
                </Typography.Title>
              </div>
            </Row>
            <Row className="add-device__form-box">
              <Col style={{ marginRight: 24 }}>
                <div className="main-form">
                  <Form.Item
                    label={labelFormDevice.deviceId.label}
                    name="deviceId"
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
                    label={labelFormDevice.deviceName.label}
                    name="deviceName"
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
                    label={labelFormDevice.deviceIp.label}
                    name="deviceIp"
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
                    label={labelFormDevice.deviceType.label}
                    name="deviceType"
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
                    {/* <Input
                      // placeholder={formatMessage('accounts.userName')}
                      maxLength={100}
                    /> */}
                    <Select>
                      {DeviceTypeOption.map((value) => (
                        <Option key={v4()} value={value}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={labelFormDevice.deviceNameToLogin.label}
                    name="deviceNameToLogin"
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
                    label={labelFormDevice.devicePassword.label}
                    name="devicePassword"
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
            </Row>
            <Row>
              <Col span={24}>
                <div className="main-form">
                  <Form.Item
                    label={labelFormDevice.deviceService.label}
                    name="deviceService"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      style={{ height: "44px !important" }}
                    >
                      {DeviceServiceOption.map((value) => (
                        <Option key={v4()} value={value.id}>
                          {value.name}
                        </Option>
                      ))}
                    </Select>
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
          <Button className="confirm" htmlType="submit" form="addDeviceForm">
            Thêm thiết bị
          </Button>
        </div>
      </Row>
    </div>
  );
}
