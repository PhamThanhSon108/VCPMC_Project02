import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import "../RoleManagement.scss";
import TextArea from "antd/lib/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks";
import {
  addRoleThunk,
  getRole,
  updateRole,
} from "../../../../modules/setting/RoleManagement/respository";
import { useEffect } from "react";
import { publicToast } from "../../../../components/toast";
const labelFormDevice = {
  serviceId: {
    label: "Tên vai trò",
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
type roleProps = {
  addDevice: boolean;
  addProvideNumber: boolean;
  addRole: boolean;
  addService: boolean;
  modifyProvideNumbers: boolean;
  modifyRoles: boolean;
  modifyServices: boolean;
  readDevices: boolean;
  readProvideNumber: boolean;
  readRole: boolean;
  readRoles: boolean;
  readServices: boolean;
  description: string;
  name: string;
  updateDevice: boolean;
  updateRole: boolean;
  updateService: boolean;
};
type RoleToSave = {
  deviceRole: keyof roleProps | any;
  name: string;
  description: string;
  serviceRole: object | any;
  provideNumber: object | any;
  managementRole: object | any;
  accountRole: object | any;
};

export default function UpdateRole() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const handleCancel = () => {
    navigate("/service");
  };

  const handleOnfinish = (data: roleProps) => {
    let role: RoleToSave = {
      name: data.name,
      description: data.description,
      deviceRole: {},
      serviceRole: {},
      provideNumber: {},
      managementRole: {},
      accountRole: {},
    };

    for (const property in data) {
      if (data[property as keyof roleProps] === true) {
        if (property.toString()?.includes("Device")) {
          role.deviceRole[property] = true;
          continue;
        }
        if (property.toString()?.includes("Service")) {
          role.serviceRole[property] = true;
          continue;
        }
        if (property.toString()?.includes("ProvideNumber")) {
          role.provideNumber[property] = true;
          continue;
        }
        if (property.toString()?.includes("Account")) {
          role.accountRole[property] = true;
          continue;
        }
        if (
          property === "readRoles" ||
          property === "updateRole" ||
          property === "addRole"
        ) {
          role.managementRole[property] = true;
          continue;
        }
      }
    }

    if (id) dispatch(updateRole({ id, role: role, navigate: navigate }));
  };
  const formatRole = (currentRole: any) => {
    form.setFieldsValue({
      ...currentRole,
      ...currentRole.deviceRole,
      ...currentRole.serviceRole,
      ...currentRole.provideNumber,
      ...currentRole.managementRole,
      ...currentRole.accountRole,
    });
  };
  useEffect(() => {
    if (id) {
      getRole(id)
        .then((doc) => {
          formatRole(doc.data());
        })
        .catch((err) => {
          publicToast({
            type: "error",
            message: "Lỗi",
            description: "Có lỗi trong quá trình xử lý",
          });
          navigate("/setting/role");
        });
    }
  }, [form]);
  return (
    <div className="wrap-page">
      <Row className="page-title">
        <Typography.Title>Danh sách vai trò</Typography.Title>
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
                  Thông tin vai trò
                </Typography.Title>
              </div>
            </Row>
            <Row className="add-device__form-box">
              <Col style={{ marginRight: 24 }}>
                <div className="main-form">
                  <Form.Item
                    label={labelFormDevice.serviceId.label}
                    name="name"
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
                    label={labelFormDevice.serviceDescription.label}
                    name="description"
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
                  <span style={{ textAlign: "start" }}>
                    <span style={{ color: "red", marginRight: "5px" }}>*</span>
                    Là trường thông tin bắt buộc
                  </span>
                </div>
              </Col>

              <Col>
                <div className="main-form">
                  <div>
                    <Typography.Title
                      level={4}
                      className="role-function-decentralization-title"
                    >
                      Phân quyền chức năng
                    </Typography.Title>

                    <div className="role-function-decentralization-wrap">
                      <div className="role-function-decentralization-item">
                        <h4 className="role-function-decentralization-item-title">
                          Chức năng thiết bị
                        </h4>
                        <Form.Item
                          valuePropName="checked"
                          name="modifyDevices"
                          rules={[]}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked) {
                                form.setFieldsValue({
                                  addDevice: true,
                                  updateDevice: true,
                                  readDevices: true,
                                });
                                // form.setFieldValue("addDevice", true);
                                // form.setFieldValue("updateDevice", true);
                                // form.setFieldValue("readDevices", true);
                              }
                            }}
                          >
                            <div>Tất cả</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="readDevices"
                          rules={[]}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (!e.target.checked) {
                                form.setFieldValue("modifyDevices", false);
                              }
                            }}
                          >
                            <div>Xem</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="addDevice"
                          rules={[]}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (!e.target.checked) {
                                form.setFieldValue("modifyDevices", false);
                              }
                            }}
                          >
                            <div>Thêm mới</div>
                          </Checkbox>
                        </Form.Item>

                        <Form.Item
                          valuePropName="checked"
                          name="updateDevice"
                          rules={[]}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (!e.target.checked) {
                                form.setFieldValue("modifyDevices", false);
                              }
                            }}
                          >
                            <div>Điều chỉnh</div>
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <div className="role-function-decentralization-item">
                        <h4 className="role-function-decentralization-item-title">
                          Chức năng dịch vụ
                        </h4>
                        <Form.Item
                          valuePropName="checked"
                          name={"modifyServices"}
                          rules={[]}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked) {
                                form.setFieldsValue({
                                  addService: true,
                                  updateService: true,
                                  readServices: true,
                                });
                              }
                            }}
                          >
                            <div>Tất cả</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="readServices"
                          rules={[]}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (!e.target.checked) {
                                form.setFieldValue("modifyServices", false);
                              }
                            }}
                          >
                            <div>Xem</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="addService"
                          rules={[]}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (!e.target.checked) {
                                form.setFieldValue("modifyServices", false);
                              }
                            }}
                          >
                            <div>Thêm mới</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="updateService"
                          rules={[]}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (!e.target.checked) {
                                form.setFieldValue("modifyServices", false);
                              }
                            }}
                          >
                            <div>Điều chỉnh</div>
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <div className="role-function-decentralization-item">
                        <h4 className="role-function-decentralization-item-title">
                          Chức năng cấp số
                        </h4>
                        <Form.Item
                          valuePropName="checked"
                          name="modifyProvideNumbers"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Tất cả</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="readProvideNumber"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Xem</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="addProvideNumber"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Cấp số mới</div>
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <div className="role-function-decentralization-item">
                        <h4 className="role-function-decentralization-item-title">
                          Chức năng quản lý vai trò
                        </h4>
                        <Form.Item
                          valuePropName="checked"
                          name="modifyRoles"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Tất cả</div>
                          </Checkbox>
                        </Form.Item>

                        <Form.Item
                          valuePropName="checked"
                          name="readRoles"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Xem</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="addRole"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Thêm mới</div>
                          </Checkbox>
                        </Form.Item>

                        <Form.Item
                          valuePropName="checked"
                          name="updateRole"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Điều chỉnh vai trò</div>
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <div className="role-function-decentralization-item">
                        <h4 className="role-function-decentralization-item-title">
                          Chức năng quản lý tài khoản
                        </h4>
                        <Form.Item
                          valuePropName="checked"
                          name="modifyAccounts"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Tất cả</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="readAccounts"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Xem</div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item
                          valuePropName="checked"
                          name="addAccount"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Thêm mới</div>
                          </Checkbox>
                        </Form.Item>

                        <Form.Item
                          valuePropName="checked"
                          name="updateAccount"
                          rules={[]}
                        >
                          <Checkbox>
                            <div>Điều chỉnh tài khoản</div>
                          </Checkbox>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
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
            Cập nhật vai trò
          </Button>
        </div>
      </Row>
    </div>
  );
}
