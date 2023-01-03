import { Typography } from "antd";
import Search from "antd/lib/input/Search";
import "./styles.scss";
function SearchCustom({
  sort,
  position,
  allowClear,
  title,
}: {
  sort?: boolean;
  position: "left" | "right";
  allowClear: boolean;
  title: string;
}) {
  return (
    <div
      className={
        position === "right" ? "selecter-custom__filter-last-item" : ""
      }
    >
      <div className="selecter-custom__filter-item">
        {/* <Typography.Title
          style={{ minWidth: "70px" }}
          level={5}
          className="selecter-custom__filter-item-title"
        >
          {title}
        </Typography.Title> */}
        <Search
          // onSearch={handleSearch}
          placeholder={title || "Nhập từ khóa"}
          allowClear={allowClear}
          className={`selecter-custom__filter-item-body ${sort && "sort"}`}
        />
      </div>
    </div>
  );
}

export default SearchCustom;
