import { images } from "../../../shared/assets/images";
import { Button, Col } from "antd";

import FormResetPassword from "./FormResetPassword";
import { useState } from "react";

export default function ResetPassword() {
  const [reset, setReset] = useState<boolean>(true);
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
            {reset ? (
              // <FormResetPassword />
              <>
                <div className="reset__title warning">Không thể kết nối!!</div>

                <div className="reset__content">
                  Dường như đã có chút trục trặc hoặc link này đã hết hạn. Vui
                  lòng thử lại hoặc yêu cầu gửi lại link để đặt lại mật khẩu của
                  bạn.
                </div>

                <div className="wrap-reset__btn center">
                  <Button
                    className="btn-outline"
                    type="ghost"

                    // className="submit__btn"
                  >
                    Yêu cầu gửi lại link
                  </Button>
                </div>
              </>
            ) : (
              <FormResetPassword />
            )}
          </div>
        </div>
      </Col>
    </div>
  );
}
