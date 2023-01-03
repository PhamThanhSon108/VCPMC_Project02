import { Col, Row, Select, Typography } from "antd";
import { Link } from "react-router-dom";
import { images } from "../../../../../shared/assets/images";
import { useState } from "react";
import TableDetailSchedule from "./TableDetailSchedule";

export default function DetailSchedule() {
  const [showList, setShowList] = useState<"cheatSheet" | "compact">(
    "cheatSheet"
  );
  return (
    <div className="page">
      <Row className="page__title">
        <Typography.Title>Lịch phát số 1</Typography.Title>
      </Row>

      <Row className="page__body">
        <Row className="page__title">
          <Typography.Title>Danh sách playlist</Typography.Title>
        </Row>
        <Col span={22} className="page__body-table">
          <TableDetailSchedule
            statusActive={"all"}
            statusConect={"all"}
            keyWord={""}
          />
        </Col>
        <Col span={2} className="page__body-modify">
          <div className="page__body-modify-container">
            <div className="page__body-modify-container-icon">
              {images.icon.addDevice}
            </div>
            <Link
              to={"add"}
              className="page__body-modify-container-label"
              // onClick={handleAddDevice}
            >
              Chỉnh sửa lịch phát
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
