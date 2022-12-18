import { Col } from "antd";
import Paragraph from "antd/lib/skeleton/Paragraph";
import { images } from "../../../shared/assets/images";
import FormLogin from "./FormLogin";
import "./Login.scss";

export default function Login() {
  return (
    <div className="wrap">
      <Col span={24} className="form__login center">
        <div className="form__login-container">
          <img src={images.logo} className={"logo"} />
          <FormLogin />
        </div>
      </Col>
    </div>
  );
}
