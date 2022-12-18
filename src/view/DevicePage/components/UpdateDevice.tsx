import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../shared/hooks";
import { getDevice, updateDevice } from "../../../modules/device/respository";
import { Option } from "antd/lib/mentions";
import { v4 } from "uuid";
import "./AddDevice.scss";
const DeviceTypeOption = ["Kiosk", "Display counter"];
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
let DeviceServiceOption: string[] | { name: string; id: string }[] = [
  "Khám tim mạch",
  "Khám sản phụ khoa",
  "Khám răng hàm mặt",
  "Khám tai mũi họng",
  "Khám hô hấp",
  "Khám tổng quát",
];
export default function UpdateDevice() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleCancel = () => {
    navigate("/device");
  };
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
    [services]
  );
  const handleUpdateDevice = (data: FormData) => {
    if (id) {
      setLoading(true);
      updateDevice({ device: data, id: id }).then(() => {
        setLoading(false);
        navigate("/device");
      });
    }
  };
  useEffect(() => {
    if (id != null) {
      getDevice(id).then((device) => {
        form.setFieldsValue(device.data());
      });
    }
  }, [form, id]);

  return (
    <div className="devicepage">
      <Row className="devicepage__title">
        <Typography.Title>Quản lý thiết bị</Typography.Title>
      </Row>

      <Row className="wrap__add-device">
        <div className="add-device__form">
          <Form
            name="updateDeviceForm"
            layout="vertical"
            form={form}
            id="updateDeviceForm"
            onFinish={handleUpdateDevice}
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
                    <Select mode="multiple">
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
          <Button
            className="confirm"
            htmlType="submit"
            form="updateDeviceForm"
            loading={loading}
          >
            Cập nhật
          </Button>
        </div>
      </Row>
    </div>
  );
}
