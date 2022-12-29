import Search from "antd/lib/input/Search";
import { Col, Row, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import { Link } from "react-router-dom";

import { images } from "../../../../shared/assets/images";
import TableDefaulPlaylist from "./TableDefaulPlaylist";
import "../styles.scss";
import SelectFilter from "../../../../shared/components/Select";
import SearchCustom from "../../../../shared/components/Select/SearchCustom";
import TabsCustom from "../../../../shared/components/Tab";
import { useState } from "react";
import ItemCustom from "../../../../shared/components/Card/ItemCustom";
import { avtUrl } from "../../../RecordStore/component/DefaultRecordStore";

export default function DefaultPlaylist() {
  const [showList, setShowList] = useState<"cheatSheet" | "compact">(
    "cheatSheet"
  );
  return (
    <div className="page">
      <Row className="page__title">
        <Typography.Title>Playlist</Typography.Title>
      </Row>
      <Row className="page__filter">
        <Col span={22} style={{ display: "flex" }}>
          <SearchCustom position="left" title="Từ khóa" allowClear />
          <TabsCustom position="right">
            <span
              onClick={() => {
                setShowList("cheatSheet");
              }}
              className={showList === "cheatSheet" ? "active" : ""}
            >
              {images.icon.cheatSheet}
            </span>
            <span
              className={showList === "compact" ? "active" : ""}
              onClick={() => {
                setShowList("compact");
              }}
            >
              {images.icon.compact}
            </span>
          </TabsCustom>
        </Col>
      </Row>
      <Row className="page__body">
        <Col span={22} className="page__body-table">
          {showList === "cheatSheet" ? (
            <TableDefaulPlaylist
              statusActive={"all"}
              statusConect={"all"}
              keyWord={""}
            />
          ) : (
            <>
              <Row className="custom-card">
                <ItemCustom
                  type="image"
                  img={avtUrl}
                  props={{
                    title: "One piece",
                    contents01: [
                      { tag: ["pop", "pop", "pop", "Chủ đề ví dụ"] },
                      { des: "Phạm Thanh Sơn", mainName: "Sáng tác:" },
                      { des: "Phạm Thanh Sơn", mainName: "Số hợp đồng:" },
                    ],
                    contents02: [
                      { desBox: "50", mainBox: "Số bản ghi" },
                      { mainBox: "Thời lượng", desBox: "01:50:30" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                    ],
                  }}
                >
                  <Link to={"detail/123"}>{images.icon.detail}</Link>
                </ItemCustom>{" "}
                <ItemCustom
                  img={avtUrl}
                  props={{
                    title: "One piece",
                    contents01: [
                      { des: "Phạm Thanh Sơn", mainName: "Ca sĩ:" },
                      { des: "Phạm Thanh Sơn", mainName: "Sáng tác:" },
                      { des: "Phạm Thanh Sơn", mainName: "Số hợp đồng:" },
                    ],
                    contents02: [
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                    ],
                  }}
                >
                  {images.icon.modifyInformation}
                </ItemCustom>{" "}
                <ItemCustom
                  img={avtUrl}
                  props={{
                    title: "One piece",
                    contents01: [
                      { des: "Phạm Thanh Sơn", mainName: "Ca sĩ:" },
                      { des: "Phạm Thanh Sơn", mainName: "Sáng tác:" },
                      { des: "Phạm Thanh Sơn", mainName: "Số hợp đồng:" },
                    ],
                    contents02: [
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                    ],
                  }}
                >
                  {images.icon.modifyInformation}
                </ItemCustom>{" "}
                <ItemCustom
                  img={avtUrl}
                  props={{
                    title: "One piece",
                    contents01: [
                      { des: "Phạm Thanh Sơn", mainName: "Ca sĩ:" },
                      { des: "Phạm Thanh Sơn", mainName: "Sáng tác:" },
                      { des: "Phạm Thanh Sơn", mainName: "Số hợp đồng:" },
                    ],
                    contents02: [
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                    ],
                  }}
                >
                  {images.icon.modifyInformation}
                </ItemCustom>{" "}
                <ItemCustom
                  img={avtUrl}
                  props={{
                    title: "One piece",
                    contents01: [
                      { des: "Phạm Thanh Sơn", mainName: "Ca sĩ:" },
                      { des: "Phạm Thanh Sơn", mainName: "Sáng tác:" },
                      { des: "Phạm Thanh Sơn", mainName: "Số hợp đồng:" },
                    ],
                    contents02: [
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                    ],
                  }}
                >
                  {images.icon.modifyInformation}
                </ItemCustom>{" "}
                <ItemCustom
                  img={avtUrl}
                  props={{
                    title: "One piece",
                    contents01: [
                      { des: "Phạm Thanh Sơn", mainName: "Ca sĩ:" },
                      { des: "Phạm Thanh Sơn", mainName: "Sáng tác:" },
                      { des: "Phạm Thanh Sơn", mainName: "Số hợp đồng:" },
                    ],
                    contents02: [
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                    ],
                  }}
                >
                  {images.icon.modifyInformation}
                </ItemCustom>{" "}
                <ItemCustom
                  img={avtUrl}
                  props={{
                    title: "One piece",
                    contents01: [
                      { des: "Phạm Thanh Sơn", mainName: "Ca sĩ:" },
                      { des: "Phạm Thanh Sơn", mainName: "Sáng tác:" },
                      { des: "Phạm Thanh Sơn", mainName: "Số hợp đồng:" },
                    ],
                    contents02: [
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                    ],
                  }}
                >
                  {images.icon.modifyInformation}
                </ItemCustom>
                <ItemCustom
                  img={avtUrl}
                  props={{
                    title: "One piece",
                    contents01: [
                      { des: "Phạm Thanh Sơn", mainName: "Ca sĩ:" },
                      { des: "Phạm Thanh Sơn", mainName: "Sáng tác:" },
                      { des: "Phạm Thanh Sơn", mainName: "Số hợp đồng:" },
                    ],
                    contents02: [
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                      { desBox: "Pop", mainBox: "Thể loại" },
                    ],
                  }}
                >
                  {images.icon.modifyInformation}
                </ItemCustom>
              </Row>
            </>
          )}
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
              Thêm Playlist
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
