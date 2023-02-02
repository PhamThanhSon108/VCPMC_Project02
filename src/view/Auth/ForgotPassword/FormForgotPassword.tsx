import FormItem from "antd/es/form/FormItem";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { publicToast } from "../../../shared/components/Toast";
import { useState } from "react";

export default function FormForgotPassword({
  setReset,
}: {
  setReset: Function;
}) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const handleCancel = () => {
    navigate("/login");
  };
  const handleSubmitForm = (data: any) => {
    setLoading(true);
    sendPasswordResetEmail(auth, data?.email)
      .then(() => {
        setReset(true);
      })
      .catch((error) => {
        publicToast({
          type: "error",
          message: "Có lỗi xảy ra!",
          description: error.message,
        });
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form onFinish={handleSubmitForm} form={form} layout="vertical">
      <Typography>
        <div className="reset__content">
          Vui lòng nhập email để đặt lại mật khẩu của bạn*
        </div>
      </Typography>
      <FormItem
        // validateTrigger={["onSubmit", "onBlur"]}
        name="email"
        rules={[
          { required: true, message: "Bạn chưa nhập email!" },
          {
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Bạn nhập sai định dạng của email",
            whitespace: false,
          },
        ]}
        label={
          <div className="loginform_field__label">
            <label>Email</label>
          </div>
        }
      >
        {/* <div className="loginform_field__label">
          <label>Email</label>
        </div> */}
        <Input className={"login__input"} placeholder="Email" name="email" />
      </FormItem>
      <Form.Item className="wrap-reset__btn center">
        <Button
          type="primary"
          htmlType="submit"
          className="submit__btn"
          loading={loading}
        >
          Xác nhận
        </Button>
      </Form.Item>
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
