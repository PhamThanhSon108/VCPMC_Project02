import { Col, Form, Row, Typography, Input, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../../../shared/assets/images";

export default function ManagerApproval() {
  const [form] = Form.useForm();
  const handleUpdateProfile = () => {};
  return (
    <div>
      <div className="page-title">Thông tin cơ bản</div>
      <div className="profile-page" style={{ width: "100%" }}>
        <div className="profile-user__box">
          <Form
            name="userProfileForm"
            layout="vertical"
            requiredMark={false}
            form={form}
            id="userProfileForm"
            onFinish={handleUpdateProfile}
          >
            <Row className="profile-form__box" justify="center">
              <Col span={7}>
                <div style={{ height: "350px", backgroundColor: "turquoise" }}>
                  Tài liệu 1
                </div>
                <div style={{ height: "200px", background: "red" }}>
                  Tài liệu2
                </div>
              </Col>
              <Col span={10}>fsdf</Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}
