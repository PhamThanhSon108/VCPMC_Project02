import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export default function FormResetPassword() {
  const navigate = useNavigate();

  const [form] = Form.useForm<{
    password: string;
    confirmpassword: string;
  }>();
  const handleFinish = (e: any) => {
    navigate("/login");
  };
  const currentPassword = Form.useWatch("password", form);
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      name="normal_login"
      className="login-form"
    >
      <>
        <div className="reset__title">Đặt lại mật khẩu</div>

        <div className="loginform_field__label">
          <label>Mật khẩu mới</label>
        </div>
        <Form.Item
          validateTrigger={["onSubmit", "onBlur"]}
          messageVariables={{ label: "good" }}
          className="wrap-login__input"
          name="password"
          rules={[
            { required: true, message: "Bạn chưa nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu có độ dài tối thiểu là 6 ký tự" },
          ]}
        >
          <Input.Password
            className={"login__input"}
            placeholder="Mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <div className="loginform_field__label">
          <label>Nhập lại mật khẩu mới</label>
        </div>

        <Form.Item
          validateTrigger={["onSubmit", "onBlur"]}
          className="wrap-login__input"
          style={{ marginBottom: "12px" }}
          name="confirmpassword"
          rules={[
            { required: true, message: "Bạn chưa nhập xác nhận mật khẩu mới" },
            { min: 6, message: "Mật khẩu có độ dài tối thiểu là 6 ký tự" },
            {
              validator: async (_, confirmpassword) => {
                if (confirmpassword !== currentPassword)
                  return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            },
          ]}
        >
          <Input.Password
            className={"login__input"}
            placeholder="Nhập lại mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        {/* <Form.ErrorList errors={errors} /> */}
        <Form.Item
          className="wrap-reset__btn center"
          style={{
            marginTop: 55,
          }}
        >
          <Button type="primary" htmlType="submit" className="submit__btn">
            Lưu mật khẩu
          </Button>
        </Form.Item>
      </>
      <div
        className="btn-redirect"
        onClick={() => {
          navigate("/login");
        }}
      >
        <label className="active">Quay lại trang đăng nhập</label>
      </div>
    </Form>
  );
}
