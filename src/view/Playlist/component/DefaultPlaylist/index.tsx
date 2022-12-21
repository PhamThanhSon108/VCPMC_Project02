import Search from "antd/lib/input/Search";
import { Col, Row, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import { Link } from "react-router-dom";

import { images } from "../../../../shared/assets/images";
import TableDefaulPlaylist from "./TableDefaulPlaylist";
import "../styles.scss";
import SelectFilter from "../../../../shared/components/Select";
import SearchCustom from "../../../../shared/components/Select/SearchCustom";

export default function DefaultPlaylist() {
  return (
    <div className="page">
      <Row className="page__title">
        <Typography.Title>Biểu đồ cấp số</Typography.Title>
      </Row>
      <Row className="page__filter">
        <Col span={22} style={{ display: "flex" }}>
          <SearchCustom position="left" title="Từ khóa" allowClear />
        </Col>
      </Row>
      <Row className="page__body">
        <Col span={22} className="page__body-table">
          <TableDefaulPlaylist
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
              Thêm thiết bị
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
