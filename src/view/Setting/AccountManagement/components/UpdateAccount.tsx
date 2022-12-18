import { Button, Col, Form, Input, Row, Select, Typography } from "antd";

import { useNavigate, useParams } from "react-router-dom";

import { v4 as v4 } from "uuid";
import { Option } from "antd/lib/mentions";
import { useAppSelector } from "../../../../shared/hooks";
import { useEffect } from "react";
import {
  getDetailAccount,
  updateAccount,
} from "../../../../modules/setting/AccountManagement/respository";
const labelFormAccount = {
  userFullname: {
    label: "Họ tên",
  },
  phoneNumber: {
    label: "Số điện thoại",
  },
  email: {
    label: "Email",
  },
  role: {
    label: "Vai trò",
  },
  userName: {
    label: "Tên đăng nhập",
  },
  password: {
    label: "Mật khẩu",
  },
  confirmPassword: {
    label: "Nhập lại mật khẩu",
  },
  status: {
    label: "Tình trạng",
  },
};
const DeviceTypeOption = ["Kiosk", "Display counter"];

export default function UpdateAccount() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const services: Array<any> | undefined = useAppSelector((state) => {
    return state.service.services;
  });
  const RoleOption = useAppSelector((state) => {
    return state.role.roles;
  });
  const handleCancel = () => {
    navigate("/setting/account");
  };

  const handleOnfinish = (data: any) => {
    if (id && data)
      updateAccount({ id, user: data }).then(() => {
        navigate("/setting/account");
      });
  };
  useEffect(() => {
    if (id)
      getDetailAccount({ id }).then((user: any) => {
        if (user) {
          form.setFieldsValue(user);
          form.setFieldValue("confirmPassword", user?.password);
        }
      });
  }, []);
  return (
    <div className="devicepage">
      <Row className="devicepage__title">
        <Typography.Title>Quản lý tài khoản</Typography.Title>
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
                  Thông tin tài khoản
                </Typography.Title>
              </div>
            </Row>
            <Row className="add-device__form-box">
              <Col style={{ marginRight: 24 }}>
                <div className="main-form">
                  <Form.Item
                    label={labelFormAccount.userFullname.label}
                    name="userFullname"
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
                    <Input maxLength={100} />
                  </Form.Item>
                  <Form.Item
                    label={labelFormAccount.phoneNumber.label}
                    name="phoneNumber"
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
                    <Input maxLength={100} />
                  </Form.Item>
                  <Form.Item
                    label={labelFormAccount.email.label}
                    name="email"
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
                    <Input maxLength={100} disabled />
                  </Form.Item>
                  <Form.Item
                    label={labelFormAccount.role.label}
                    name="role"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select style={{ height: "44px !important" }}>
                      {RoleOption.map((value: any) => {
                        return (
                          <Option key={value.id} value={value.name}>
                            {value.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </Col>

              <Col>
                <div className="main-form">
                  <Form.Item
                    label={labelFormAccount.userName.label}
                    name="userName"
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
                    <Input maxLength={100} />
                  </Form.Item>
                  <Form.Item
                    label={labelFormAccount.password.label}
                    name="password"
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
                    <Input type={"password"} maxLength={100} />
                  </Form.Item>
                  <Form.Item
                    label={labelFormAccount.confirmPassword.label}
                    name="confirmPassword"
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
                    <Input type={"password"} maxLength={100} />
                  </Form.Item>
                  <Form.Item
                    label={labelFormAccount.status.label}
                    name="status"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select style={{ height: "44px !important" }}>
                      <Option key={v4()} value="active">
                        Hoạt động
                      </Option>
                      <Option key={v4()} value="inactive">
                        Ngưng hoạt động
                      </Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
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
            Cập nhật
          </Button>
        </div>
      </Row>
    </div>
  );
}
