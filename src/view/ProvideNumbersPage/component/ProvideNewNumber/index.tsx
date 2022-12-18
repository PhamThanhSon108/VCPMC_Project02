import { Button, Col, Form, Row, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../shared/hooks";
import { Option } from "antd/lib/mentions";
import { v4 } from "uuid";
import { modalProvideNewNumber } from "./ModalProvideNewNumber";
import { provideNumber } from "../../../../modules/provideNumbers/respository";
import { formatDate } from "../TableProvideNumbers/TableProvideNumbers";
import { useMemo } from "react";
import "../../../ServicePage/Service.scss";
export default function ProvideNewNumber() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/providenumbers");
  };
  const handleOnfinish = (data: any) => {
    provideNumber({ id: data.deviceService }).then((number: any) => {
      if (number)
        modalProvideNewNumber({
          ordinalNumbers: number?.service?.option?.preFix
            ? number?.ordinalNumbers + number?.service?.serviceId
            : number?.service?.serviceId + number?.ordinalNumbers,
          serviceName: number?.service?.serviceName,
          createdTime: formatDate(number?.createdAt.seconds),
          expiredTime: formatDate(number?.createdAt.seconds, true),
        });
    });
  };
  const services: Array<any> | undefined = useAppSelector((state) => {
    return state.service.services;
  });
  const DeviceServiceOption = useMemo(
    () =>
      services.map((value) => ({
        name: value?.serviceName,
        id: value?.id,
      })),
    [services]
  );
  return (
    <>
      <div className="wrap-page">
        <Row className="page-title">
          <Typography.Title>Quản lý dịch vụ</Typography.Title>
        </Row>
        <Row className="wrap-page__add provide-new-nums">
          <div className="provide-new-nums-wrap">
            <Form
              name="addServiceForm"
              layout="vertical"
              form={form}
              id="addServiceForm"
              onFinish={handleOnfinish}
            >
              <Row>
                <div>
                  <Typography.Title
                    level={4}
                    style={{ textAlign: "center" }}
                    className="add-device__form-title"
                  >
                    CẤP SỐ MỚI
                  </Typography.Title>
                </div>
              </Row>
              <Row className="add-device__form-box">
                <Col>
                  <div className="main-form">
                    <Form.Item
                      label={"Dịch vụ sử dụng"}
                      name="deviceService"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder={"Chọn dịch vụ"}
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
                  <Row>
                    <div className="add-device__btn-wrap">
                      <Button className="cancel" onClick={handleCancel}>
                        Hủy bỏ
                      </Button>
                      <Button
                        className="confirm"
                        htmlType="submit"
                        form="addServiceForm"
                      >
                        In số
                      </Button>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
        </Row>
      </div>
    </>
  );
}
