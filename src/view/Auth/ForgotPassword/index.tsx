import "./ForgotPassword.scss";
import { images } from "../../../shared/assets/images";
import { Col } from "antd";
import { useState } from "react";
import FormForgotPassword from "./FormForgotPassword";

export default function ForgotPassword() {
  const [reset, setReset] = useState<boolean>(false);
  return (
    <div className="wrap">
      <Col span={24} className="form__login">
        <div className="form__login-container">
          <img src={images.logo} className="logo" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="reset__title">KHÔI PHỤC MẬT KHẨU</div>
            {reset ? (
              // <FormResetPassword />
              <>
                <div className="reset__content">
                  <span>
                    Link khôi phục mật khẩu đã được gửi vào mail của bạn. Vui
                    lòng kiểm tra mail.
                  </span>
                  <span>
                    Click vào đường link được đính kèm trong mail để chuyển đến
                    trang đặt lại mật khẩu.
                  </span>
                </div>
              </>
            ) : (
              <FormForgotPassword setReset={setReset} />
            )}
          </div>
        </div>
      </Col>
    </div>
  );
}
