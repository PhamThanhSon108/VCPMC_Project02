import FormItem from "antd/es/form/FormItem";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export default function FormForgotPassword({
  setReset,
}: {
  setReset: Function;
}) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleCancel = () => {
    navigate("/login");
  };
  const handleContinue = () => {};
  return (
    <Form
      onFinish={() => {
        setReset(true);
      }}
      form={form}
      layout="vertical"
    >
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
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
          onClick={handleContinue}
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
