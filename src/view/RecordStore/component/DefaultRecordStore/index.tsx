import Search from "antd/lib/input/Search";
import { Col, Row, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import { Link } from "react-router-dom";

import { images } from "../../../../shared/assets/images";

import "../styles.scss";
import SelectFilter from "../../../../shared/components/Select";
import SearchCustom from "../../../../shared/components/Select/SearchCustom";
import TableDefaulRecordStore from "./TableDefaulRecordStore";
import TabsCustom from "../../../../shared/components/Tab";
import { useState } from "react";
import ItemCustom from "../../../../shared/components/Card/ItemCustom";
import PlayVideoModal from "../../../../shared/components/Modal/PlayVideoModal";

export default function DefaultRecordStore() {
  const [showList, setShowList] = useState<"cheatSheet" | "compact">(
    "cheatSheet"
  );

  const avtUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDrvKyt1Je7fm-ENkI9exhhqnzD4MfBrhAHw&usqp=CAU";
  return (
    <>
      <div className="page">
        <Row className="page__title">
          <Typography.Title>Biểu đồ cấp số</Typography.Title>
        </Row>
        <Row className="page__filter">
          <Col span={22} style={{ display: "flex" }}>
            <SearchCustom position="left" title="Từ khóa" allowClear />
          </Col>
        </Row>
        <Row className="page__filter">
          <Col span={22} style={{ display: "flex" }}>
            <SelectFilter
              onChange={() => {}}
              options={[{ label: "Tất cả", value: "all" }]}
              title="Thể loại:"
              suffixIcon={images.icon.arrow}
            />
            <SelectFilter
              onChange={() => {}}
              options={[{ label: "Tất cả", value: "all" }]}
              title="Định dạng:"
              suffixIcon={images.icon.arrow}
            />
            <SelectFilter
              onChange={() => {}}
              options={[{ label: "Tất cả", value: "all" }]}
              title="Thời hạn sử dụng:"
              suffixIcon={images.icon.arrow}
            />

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
              <TableDefaulRecordStore
                statusActive={"all"}
                statusConect={"all"}
                keyWord={""}
              />
            ) : (
              <>
                <Row className="custom-card">
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
                  />

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
                  />
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
                  />
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
                  />
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
                  />
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
                  />
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
                  />
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
                  />
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
                  />
                </Row>
              </>
            )}
          </Col>
          <Col span={2} className="page__body-modify">
            <div className="page__body-modify-container">
              <div className="page__body-modify-container-icon">
                {images.icon.modifyInformation}
              </div>
              <Link
                to={"manager-approval"}
                className="page__body-modify-container-label"
                // onClick={handleAddDevice}
              >
                Quản lý phê duyệt
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
