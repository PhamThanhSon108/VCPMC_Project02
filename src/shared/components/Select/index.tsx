import { Select, Typography } from "antd";
import { ReactElement } from "react";
import "./styles.scss";

function SelectFilter({
  onChange,
  suffixIcon,
  options,
  title,
}: {
  title: string;
  onChange: any;
  suffixIcon: ReactElement;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="selecter-custom__filter-item">
      <Typography.Title
        level={5}
        className="selecter-custom__filter-item-title"
      >
        {title}
      </Typography.Title>
      <Select
        onChange={onChange}
        suffixIcon={suffixIcon}
        className="selecter-custom__filter-item-body"
        defaultValue={options[0]?.label}
        options={options}
      />
    </div>
  );
}

export default SelectFilter;
