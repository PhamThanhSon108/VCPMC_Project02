import "./Profile.scss";

import { Avatar, Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../shared/hooks";
import { images } from "../../../shared/assets/images";
import { Link } from "react-router-dom";
import ChangePasswordModal from "../../../shared/components/Modal/ChangePasswordModal";

const Profile = () => {
  const linkAvata =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4RibnQG5pD0n3phSU3-shJNYP4-dRtkzIg&usqp=CAU";
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.profile.user);

  const [isOpenModalChangePassword, setIsOpenModalChangePassword] =
    useState<boolean>(false);
  const handleOpenChangePasswordModel = useCallback(() => {
    setIsOpenModalChangePassword(true);
  }, []);
  useEffect(() => {
    if (user != null) {
      form.setFieldsValue(user);
    }
  }, [form, user]);
  return (
    <>
      <ChangePasswordModal
        isModalOpen={isOpenModalChangePassword}
        setIsModalOpen={setIsOpenModalChangePassword}
      />
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
            >
              <Row className="profile-form__box" justify="center">
                <Col span={6} className="profile-avatar">
                  <Avatar
                    size={"large"}
                    src={linkAvata}
                    style={{ width: 230, height: 230 }}
                  />
                  <Typography.Title
                    style={{
                      margin: "20px 0 0 0",
                      fontSize: "20px",
                      lineHeight: "30px",
                      color: "white",
                    }}
                  >
                    {user?.userFullName || "Phạm Thanh Sơn"}
                  </Typography.Title>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={12}>
                      <div className="main-form">
                        <Form.Item
                          label={"Họ"}
                          name="userLastname"
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
                          <Input disabled={true} maxLength={100} />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="main-form">
                        <Form.Item
                          label={"Tên"}
                          name="userFirstname"
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
                          <Input disabled={true} maxLength={100} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <div className="main-form">
                        <Form.Item
                          label={"Ngày sinh"}
                          name="birthday"
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
                          <Input maxLength={100} disabled={true} />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="main-form">
                        <Form.Item
                          label={"Số điện thoại"}
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
                          <Input maxLength={100} disabled={true} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <div className="main-form">
                        <Form.Item
                          label={"Email"}
                          name="email"
                          rules={[
                            {
                              required: true,
                              type: "email",
                            },
                          ]}
                        >
                          <Input disabled={true} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <div className="main-form">
                        <Form.Item
                          label={"Tên đăng nhập"}
                          name="userName"
                          rules={[
                            {
                              required: true,
                              type: "string",
                            },
                          ]}
                        >
                          <Input disabled={true} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <div className="main-form">
                        <Form.Item
                          label={"Vai trò"}
                          name="roleName"
                          rules={[
                            {
                              required: true,
                              type: "string",
                            },
                          ]}
                        >
                          <Input disabled={true} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <div
                    className="page__body-modify-container"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div className="page__body-modify-container-icon">
                      {images.icon.modifyInformation}
                    </div>
                    <Link
                      to={"add"}
                      className="page__body-modify-container-label"
                    >
                      Sửa thông tin
                    </Link>
                  </div>

                  <div
                    className="page__body-modify-container"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                    onClick={handleOpenChangePasswordModel}
                  >
                    <div className="page__body-modify-container-icon">
                      {images.icon.changePassword}
                    </div>
                    <div className="page__body-modify-container-label">
                      Đổi mật khẩu
                    </div>
                  </div>

                  <div
                    className="page__body-modify-container"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div className="page__body-modify-container-icon">
                      {images.icon.logout}
                    </div>
                    <Link
                      to={"add"}
                      className="page__body-modify-container-label"
                    >
                      Đăng xuất
                    </Link>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="button-center__box profile-button-update">
            <>
              <Button
                className="cancel-button mx-5"
                onClick={() => {}}
              ></Button>
              <Button
                type="primary"
                className="normal-button"
                htmlType="submit"
                form="userProfileForm"
              ></Button>
            </>
            )
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Profile);
