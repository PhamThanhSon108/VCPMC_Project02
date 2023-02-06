import {
  Col,
  Form,
  Row,
  Typography,
  Input,
  Button,
  Avatar,
  Badge,
  Select,
  Checkbox,
} from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { images } from "../../../../shared/assets/images";
import ItemCustom from "../../../../shared/components/Card/ItemCustom";
import PlayVideoModal from "../../../../shared/components/Modal/PlayVideoModal";
import RefuseApprovalModal from "../../../../shared/components/Modal/RefuseApprovalModal";
import SelectFilter from "../../../../shared/components/Select";
import SearchCustom from "../../../../shared/components/Select/SearchCustom";
import TabsCustom from "../../../../shared/components/Tab";
import { avtUrl } from "../DefaultRecordStore";
import { PropsDefaultRecordStore } from "../DefaultRecordStore/TableDefaulRecordStore";
import TableManagerApproval from "./TableManagerApproval";

export default function ManagerApproval() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const location = useLocation();
  const [showList, setShowList] = useState<"cheatSheet" | "compact">(
    "cheatSheet"
  );
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedAllKeys, setSelectedAllKeys] = useState<boolean>(false);
  const [isRefuseApproval, setIsRefuseApproval] = useState<boolean>(false);
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);

  const handleCheck = (check: boolean, id: string) => {
    if (!id) {
      return;
    }
    if (check && id) {
      if (selectedKeys.length === 3) {
        setSelectedAllKeys(true);
      }
      setSelectedKeys((pre) => [...pre, id]);
      return;
    }
    if (!check) {
      setSelectedKeys((pre) => pre.filter((value) => value !== id));
      setSelectedAllKeys(false);
      return;
    }
  };
  const handleCheckAll = (e: CheckboxChangeEvent) => {
    if (!e.target.value && selectedKeys.length === 4) {
      return;
    }
    setSelectedAllKeys(e.target.checked);
  };

  useEffect(() => {
    if (id) {
      setIsPlayVideo(true);
    }
  }, [location.pathname]);
  return (
    <>
      <PlayVideoModal
        path="/record-store/manager-approval"
        isModalOpen={isPlayVideo}
        setIsModalOpen={setIsPlayVideo}
      />
      <RefuseApprovalModal
        setIsModalOpen={setIsRefuseApproval}
        isModalOpen={isRefuseApproval}
      />
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
            {showList === "compact" ? (
              <div
                style={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  margin: "0 15px",
                }}
              >
                <Checkbox checked={selectedAllKeys} onChange={handleCheckAll} />
                <span style={{ paddingLeft: "8px" }}>Chọn tất cả</span>
              </div>
            ) : null}

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
              <TableManagerApproval
                statusActive={"all"}
                statusConect={"all"}
                keyWord={""}
              />
            ) : (
              <>
                <Row className="custom-card">
                  <ItemCustom
                    path="/record-store/manager-approval"
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
                    {
                      <Checkbox
                        checked={selectedAllKeys || selectedKeys.includes("0")}
                        onChange={(e: CheckboxChangeEvent) => {
                          handleCheck(e.target.checked, "0");
                        }}
                      />
                    }
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
                    {
                      <Checkbox
                        checked={selectedAllKeys || selectedKeys.includes("1")}
                        onChange={(e: CheckboxChangeEvent) => {
                          handleCheck(e.target.checked, "1");
                        }}
                      />
                    }
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
                    {
                      <Checkbox
                        checked={selectedAllKeys || selectedKeys.includes("2")}
                        onChange={(e: CheckboxChangeEvent) => {
                          handleCheck(e.target.checked, "2");
                        }}
                      />
                    }
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
                    {
                      <Checkbox
                        checked={selectedAllKeys || selectedKeys.includes("3")}
                        onChange={(e: CheckboxChangeEvent) => {
                          handleCheck(e.target.checked, "3");
                        }}
                      />
                    }
                  </ItemCustom>
                </Row>
              </>
            )}
          </Col>
          <Col span={2} className="page__body-modify">
            <div className="page__body-modify-container">
              <div className="page__body-modify-container-icon">
                {images.icon.approval}
              </div>
              <Link
                to={"manager-approval"}
                className="page__body-modify-container-label"
                // onClick={handleAddDevice}
              >
                Phê duyệt
              </Link>
            </div>
            <div
              className="page__body-modify-container"
              style={{
                color: "red",
              }}
              onClick={() => {
                setIsRefuseApproval(true);
              }}
            >
              <div className="page__body-modify-container-icon">
                {images.icon.delete}
              </div>
              <div className="page__body-modify-container-label">Từ chối</div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
