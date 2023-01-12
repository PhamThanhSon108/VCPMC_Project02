import { Col, Row } from "antd";
import { images } from "../../../../../../shared/assets/images";
import SelectFilter from "../../../../../../shared/components/Select";
import SearchCustom from "../../../../../../shared/components/Select/SearchCustom";
import TableAuthorisations from "../../DefaultContracts/TableAuthorisations";

export default function AuthorizedWork() {
  return (
    <>
      <Row className="page__filter">
        <Col span={24} style={{ display: "flex" }}>
          <SelectFilter
            onChange={() => {}}
            options={[{ label: "Tất cả", value: "all" }]}
            title="Tình trạng phê duyệt:"
            suffixIcon={images.icon.arrow}
          />

          <SearchCustom
            position="right"
            title="Tên hợp đồng, số hợp đồng, người uỷ quyền..."
            allowClear
          />
        </Col>
      </Row>
      <Row className="page__body">
        <Col span={24} className="page__body-table">
          {
            <TableAuthorisations
              statusActive={"all"}
              statusConect={"all"}
              keyWord={""}
            />
          }
        </Col>
      </Row>
    </>
  );
}
