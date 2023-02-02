import "./Profile.scss";

import { Avatar, Button, Col, Form, Input, Row, Spin, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { images } from "../../../shared/assets/images";
import { Link, useNavigate } from "react-router-dom";
import ChangePasswordModal from "../../../shared/components/Modal/ChangePasswordModal";
import {
  getProfile,
  logout,
  logOut,
  updateProfile,
} from "../../../modules/authentication/repository";
import profileStore from "../../../modules/authentication/profileStore";
import { publicToast } from "../../../shared/components/Toast";

const Profile = () => {
  const avtUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDrvKyt1Je7fm-ENkI9exhhqnzD4MfBrhAHw&usqp=CAU";
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.profile.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      getProfile()
        .then((user) => {
          console.log(user);
          dispatch(profileStore.actions.fetchProfile({ user: user }));
        })
        .catch((mes) => {
          publicToast(mes);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const [isOpenModalChangePassword, setIsOpenModalChangePassword] =
    useState<boolean>(false);

  const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);
  const handleOpenChangePasswordModel = useCallback(() => {
    setIsOpenModalChangePassword(true);
  }, []);

  const handleUpdateProfile = (data: any) => {
    console.log(data, ["data"]);
    setLoading(true);
    updateProfile({ id: user?.id || "GoPp5LMQUNZXFCkgQkKa", data })
      .then((mess) => {
        dispatch(
          profileStore.actions.fetchProfile({
            user: {
              ...user,
              phoneNumber: data?.phoneNumber,
              userFirstname: data.userFirstname,
              userLastname: data.userLastname,
              birthday: data.birthday,
            },
          })
        );
        publicToast({
          type: "success",
          message: "Cập nhật thông tin thành công",
          description: "Cập nhật thông tin thành công",
        });
      })
      .catch((err) => {
        console.log(err);
        publicToast({
          type: "error",
          message: "Cập nhật thông tin thất bại!",
          description: "Cập nhật thông tin thất bại!",
        });
      })
      .finally(() => {
        setIsUpdateProfile(false);
        setLoading(false);
      });
  };
  const handleLogOut = () => {
    logout()
      .then(() => {
        dispatch(profileStore.actions.logOut());
        navigate("/login");
      })
      .catch(() => {
        publicToast({
          type: "error",
          description: "Có lỗi xảy ra",
          message: "Đăng xuất thất bại",
        });
      });
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
      {loading ? (
        <Spin size="large">
          <div className="content" />
        </Spin>
      ) : null}
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
              onLoad={() => "đang load"}
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
                          name="email"
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
                          loading={loading}
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
                    fontSize: "7px !important",
                  }}
                >
                  <div className="page__body-modify-container">
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
                    onClick={handleOpenChangePasswordModel}
                  >
                    <div className="page__body-modify-container-icon">
                      {images.icon.changePassword}
                    </div>
                    <div className="page__body-modify-container-label">
                      Đổi mật khẩu
                    </div>
                  </div>

                  <div className="page__body-modify-container">
                    <div className="page__body-modify-container-icon">
                      {images.icon.logout}
                    </div>
                    <div
                      className="page__body-modify-container-label"
                      onClick={handleLogOut}
                    >
                      Đăng xuất
                    </div>
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
