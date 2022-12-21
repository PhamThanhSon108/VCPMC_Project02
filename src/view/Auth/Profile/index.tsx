import "./Profile.scss";

import { Avatar, Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../shared/hooks";
import { images } from "../../../shared/assets/images";
import { Link } from "react-router-dom";
import ChangePasswordModal from "../../../shared/components/Modal/ChangePasswordModal";

const Profile = () => {
  const avtUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDrvKyt1Je7fm-ENkI9exhhqnzD4MfBrhAHw&usqp=CAU";
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.profile.user);

  const [isOpenModalChangePassword, setIsOpenModalChangePassword] =
    useState<boolean>(false);

  const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);
  const handleOpenChangePasswordModel = useCallback(() => {
    setIsOpenModalChangePassword(true);
  }, []);

  const handleUpdateProfile = () => {
    setIsUpdateProfile(false);
  };
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
              onFinish={handleUpdateProfile}
            >
              <Row className="profile-form__box" justify="center">
                <Col span={6} className="profile-avatar">
                  <Avatar
                    size={"large"}
                    src={avtUrl}
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
                        <Form.Item label={"Họ"} name="userLastname" rules={[]}>
                          <Input disabled={!isUpdateProfile} maxLength={100} />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="main-form">
                        <Form.Item
                          label={"Tên"}
                          name="userFirstname"
                          rules={[]}
                        >
                          <Input disabled={!isUpdateProfile} maxLength={100} />
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
                          rules={[]}
                        >
                          <Input maxLength={100} disabled={!isUpdateProfile} />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="main-form">
                        <Form.Item
                          label={"Số điện thoại"}
                          name="phoneNumber"
                          rules={[]}
                        >
                          <Input maxLength={100} disabled={!isUpdateProfile} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <div className="main-form">
                        <Form.Item label={"Email"} name="email" rules={[]}>
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
                          rules={[{}]}
                        >
                          <Input disabled={true} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <div className="main-form">
                        <Form.Item label={"Vai trò"} name="roleName" rules={[]}>
                          <Input disabled={true} />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  {isUpdateProfile ? (
                    <Row>
                      <div
                        className="btn-wrap"
                        style={{ alignItems: "center", marginTop: 30 }}
                      >
                        <Button
                          className="cancel"
                          onClick={() => {
                            setIsUpdateProfile(false);
                          }}
                        >
                          Hủy bỏ
                        </Button>
                        <Button
                          className="confirm"
                          htmlType="submit"
                          form="userProfileForm"
                        >
                          Lưu
                        </Button>
                      </div>
                    </Row>
                  ) : null}
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
                    <div
                      className="page__body-modify-container-label"
                      onClick={() => {
                        setIsUpdateProfile(true);
                      }}
                    >
                      Sửa thông tin
                    </div>
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
                      to={"/login"}
                      className="page__body-modify-container-label"
                    >
                      Đăng xuất
                    </Link>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Profile);
