import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Badge, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../shared/hooks";

export interface DataType {
  id: string;
  deviceId: string;
  deviceName: string;
  deviceIp: string;
  statusActive: string;
  statusConect: string;
  deviceService: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã thiết bị",
    dataIndex: "deviceId",
    key: "deviceId",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên thiết bị",
    dataIndex: "deviceName",
    key: "deviceName",
  },
  {
    title: "Địa chỉ IP",
    dataIndex: "deviceIp",
    key: "deviceIp",
  },
  {
    title: "Trạng thái hoạt động",
    key: "statusActive",
    dataIndex: "statusActive",
    render: (_, { statusActive }) => {
      return (
        <>
          {statusActive === "active" ? (
            <Badge status="success" text="Đang hoạt động" />
          ) : (
            <Badge status="error" text="Ngưng hoạt động" />
          )}
        </>
      );
    },
  },
  {
    title: "Trạng thái kết nối",
    key: "statusConect",
    render: (_, record) => (
      <>
        {record.statusConect === "conected" ? (
          <Badge status="success" text="Kết nối" />
        ) : (
          <Badge status="error" text="Mất kết nối" />
        )}
      </>
    ),
  },
  {
    title: "Dịch vụ sử dụng",
    key: "deviceService",
    render: (_, { deviceService }) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0px 160px 0px 16px",
        }}
      >
        <span>{deviceService}</span>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            color: "#4277FF",
            textDecoration: "underline",
          }}
        >
          Xem thêm
        </div>
      </div>
    ),
  },
  {
    key: "detail",
    render: (_, { id }) => (
      <Link
        to={`/device/detail/${id}`}
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#4277FF",
          textDecoration: "underline",
        }}
      >
        Chi tiết
      </Link>
    ),
  },
  {
    key: "update",
    render: (_, { id }) => (
      <Link
        to={`/device/update/${id}`}
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#4277FF",
          textDecoration: "underline",
        }}
      >
        Cập nhật
      </Link>
    ),
  },
];

const itemRender = (_: any, type: string, originalElement: ReactNode) => {
  if (type === "prev") {
    return (
      <>
        <CaretLeftOutlined />
      </>
    );
  }
  if (type === "next") {
    return <CaretRightOutlined />;
  }
  return originalElement;
};
export default React.memo(function TableDevice({
  statusActive,
  statusConect,
  keyWord,
}: {
  statusActive: "active" | "inactive" | "all";
  statusConect: "conected" | "fail" | "all";
  keyWord: string | undefined;
}) {
  const devices = useAppSelector((state) => state.device);
  let data: DataType[] | any = devices.devices;
  const services: Array<any> | undefined = useAppSelector((state) => {
    return state.service.services;
  });
  const DeviceServiceOption = useMemo(
    () =>
      services.reduce((serviceToShow: any, value: { id: string }) => {
        Object.assign(serviceToShow, { [value.id]: value });
        return serviceToShow;
      }, {}),
    [services]
  );
  const formatData = () => {
    data = devices.devices
      ?.map((value: any) => ({
        ...value,
        deviceService: value?.deviceService?.map(
          (item: any) => DeviceServiceOption[item]?.serviceName + " "
        ),
      }))

      .filter((item) => {
        if (!!keyWord && !item?.deviceService.join("")?.includes(keyWord)) {
          return;
        }
        if (statusActive === "all" && statusConect === "all")
          return !!keyWord
            ? item?.deviceService.join("")?.includes(keyWord)
            : item;
        if (statusActive === "all" && statusConect != "all")
          return item.statusConect === statusConect;
        if (statusConect === "all" && statusActive != "all")
          return item.statusActive === statusActive;
        if (statusConect !== "all" && statusActive !== "all")
          return (
            item.statusActive === statusActive &&
            item.statusConect === statusConect
          );
      });
  };
  formatData();
  return (
    <Table
      loading={devices.loading}
      className="table__device"
      columns={columns}
      dataSource={data}
      size={"middle"}
      pagination={{
        pageSize: 9,
        itemRender: itemRender,
      }}
      bordered
    />
  );
});
