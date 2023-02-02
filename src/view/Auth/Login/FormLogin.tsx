import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

import { useAppDispatch } from "../../../shared/hooks";
import { login } from "../../../modules/authentication/repository";
import routes from "../../../config/routes";
import { publicToast } from "../../../shared/components/Toast";
type LoginStatus = "pending" | "fulfill" | "reject" | undefined;
type FormData = {
  remember?: string;
  names: { username: string; password: string };
};
export default React.memo(function FormLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [loginStatus, setLoginStatus] = useState<LoginStatus>();
  const handleFinish = (data: FormData) => {
    setLoginStatus("pending");
    login({ email: data.names.username, password: data.names.password })
      .then((user) => {
        console.log(user, "gettoken");

        navigate("/record-store");
        //  sessionStorage.setItem(
        //    "Auth Token",
        //    user?._tokenResponse.refreshToken
        //  );
        setLoginStatus("fulfill");
      })
      .catch((err) => {
        publicToast({ type: "error", message: err, description: err });
        signOut(auth);
        setLoginStatus("reject");
      })
      .finally(() => {});
    delete data.remember;
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      name="normal_login"
      className="login-form"
    >
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (names.password.length == 0 || names.username.length == 0) {
                return Promise.reject(new Error(names));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <div className="reset__title">Đăng nhập</div>
            <div className="loginform_field__label">
              <label>Tên đăng nhập *</label>
            </div>
            <Form.Item
              validateTrigger={["onSubmit", "onBlur"]}
              className="wrap-login__input"
              name="username"
              rules={[
                { required: true, message: "Bạn chưa nhập tài khoản!" },
                {
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Bạn nhập sai định dạng của email",
                  whitespace: false,
                },
              ]}
            >
              <Input className={"login__input"} placeholder="Nhập tài khoản" />
            </Form.Item>
            <div className="loginform_field__label">
              <label>Password *</label>
            </div>

            <Form.Item
              validateTrigger={["onSubmit", "onBlur"]}
              className="wrap-login__input"
              style={{ marginBottom: "14px" }}
              name="password"
              rules={[
                { required: true, message: "Bạn chưa nhập mật khẩu" },
                { min: 6, message: "Mật khẩu có độ dài tối thiểu là 6 ký tự" },
              ]}
            >
              <Input.Password
                className={"login__input"}
                placeholder="Nhập mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              validateTrigger={["onSubmit", "onBlur"]}
              className="wrap-login__input"
              style={{ marginBottom: "12px" }}
              name="savePassword"
            >
              <Checkbox className={"login__input"}>
                <div className="" style={{ color: "white", opacity: "0.7" }}>
                  <label>Ghi nhớ mật khẩu</label>
                </div>
              </Checkbox>
            </Form.Item>

            <Form.Item className="wrap-login__input center">
              <Button
                loading={loginStatus === "pending"}
                type="primary"
                htmlType="submit"
                className="login-form-button submit__btn"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div
        className="btn-redirect"
        onClick={() => {
          navigate(routes.forgotPassWord);
        }}
      >
        <label className="active">Quên mật khẩu?</label>
      </div>
    </Form>
  );
});
