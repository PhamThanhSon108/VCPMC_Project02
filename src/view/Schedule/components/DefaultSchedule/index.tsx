import { Col, Row, Select, Typography } from "antd";
import { Link } from "react-router-dom";
import { images } from "../../../../shared/assets/images";

import { useState } from "react";
import TableDefaulSchedule from "./TableDefaulSchedule";

export default function DefaultSchedule() {
  const [showList, setShowList] = useState<"cheatSheet" | "compact">(
    "cheatSheet"
  );
  return (
    <div className="page">
      <Row className="page__title">
        <Typography.Title>Danh sách lịch phát</Typography.Title>
      </Row>

      <Row className="page__body">
        <Col span={22} className="page__body-table">
          <TableDefaulSchedule
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
              to={"update/fdsf"}
              className="page__body-modify-container-label"
              // onClick={handleAddDevice}
            >
              Thêm lịch phát
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
