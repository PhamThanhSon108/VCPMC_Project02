import { Col, Row, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import Search from "antd/lib/input/Search";
import { useAppDispatch } from "../../../../shared/hooks";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../../shared/assets/images";
import TableAccountManagement from "./TableAccountManagement";
import { useEffect } from "react";
import { getAccounts } from "../../../../modules/setting/AccountManagement/respository";
import { accountStore } from "../../../../modules/setting/AccountManagement/accountStore";

type deviceProps = {
  setStatus?: (value: string) => void;
};
export default function AccountManagement({ setStatus }: deviceProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleAddDevice = () => {
    navigate("add");
  };
  useEffect(() => {
    getAccounts().then((user) => {
      dispatch(accountStore.actions.fetchAccount({ accounts: user }));
    });
  }, []);
  return (
    <div className="devicepage">
      <Row className="devicepage__title">
        <Typography.Title>Quản lý tài khoản</Typography.Title>
      </Row>
      <Row className="devicepage__filter">
        <Col span={22} style={{ display: "flex" }}>
          <div className="devicepage__filter-item">
            <Typography.Title
              level={5}
              className="devicepage__filter-item-title"
            >
              Tên vai trò
            </Typography.Title>
            <Select
              suffixIcon={images.icon.arrow}
              className="devicepage__filter-item-body"
              defaultValue={"Tất cả"}
            >
              <Option value="">Tất cả</Option>
              <Option value="1">Hoạt động</Option>
              <Option value="2">Ngưng hoạt động</Option>
            </Select>
          </div>

          <div className="devicepage__filter-last-item">
            <div className="devicepage__filter-item">
              <Typography.Title
                level={5}
                className="devicepage__filter-item-title"
              >
                Từ khóa
              </Typography.Title>
              <Search
                placeholder="Nhập từ khóa"
                allowClear
                className="devicepage__filter-item-body"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="devicepage__body">
        <Col span={22} className="devicepage__body-table">
          <TableAccountManagement />
        </Col>
        <Col span={2} className="devicepage__body-modify">
          <div className="devicepage__body-modify-container">
            <div className="devicepage__body-modify-container-icon">
              {images.icon.addDevice}
            </div>
            <Link
              to={"add"}
              className="devicepage__body-modify-container-label"
              onClick={handleAddDevice}
            >
              Thêm tài khoản
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
