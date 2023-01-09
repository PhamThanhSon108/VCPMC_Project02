import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import { Link, useLocation } from "react-router-dom";
const typePath = {
  "record-store": {
    path: "record-store",
    label: "Kho bản ghi",
    child: {
      "manager-approval": {
        path: "manager-approval",
        label: "Quản lý phê duyệt",
      },
      play: { path: "play", label: "Phát" },
      update: { path: "update", label: "Câp nhật thiết bị" },
      detail: { path: "detail", label: "Chi tiết thiết bị" },
      providenumbers: { path: "providenumbers", label: "Danh sách cấp số" },
    },
  },
  playlist: {
    path: "playlist",
    label: "Playlist",
    child: {
      add: {
        path: "add",
        label: "Thêm playlist mới",
      },
      update: {
        path: "update",
        label: "Cập nhật",
      },
      detail: {
        path: "detail",
        label: "Chi tiết Playlist",
      },
    },
  },
  contract: {
    path: "contract",
    label: "Quản lý",
    child: {
      add: {
        path: "add",
        label: "Thêm hợp đồng",
      },
      update: {
        path: "update",
        label: "Cập nhật",
      },
      detail: {
        path: "detail",
        label: "Chi tiết",
      },
    },
  },
  schedule: {
    path: "schedule",
    label: "Lập lịch phát",
    child: {
      detail: {
        path: "detail",
        label: "Chi tiết",
      },
      update: {
        path: "update",
        label: "Cập nhật",
      },
    },
  },
  service: {
    parentLabel: "Dịch vụ",
    path: "service",
    label: "Danh sách dịch vụ",
    child: {
      add: { path: "add", label: "Thêm thiết bị" },
      update: { path: "update", label: "Cập nhật dịch vụ" },
      detail: { path: "detail", label: "Chi tiết dịch vụ" },
    },
  },
  report: {
    parentLabel: "Báo cáo",
    path: "report",
    label: "Lập báo cáo",
  },
  setting: {
    path: "setting",
    label: "Cài đặt hệ thống",
    child: {
      role: {
        path: "role",
        label: "Quản lý vai trò",
        child: {
          add: {
            label: "Thêm vai trò",
          },
          update: {
            label: "Cập nhật vai trò",
          },
        },
      },

      account: {
        path: "role",
        label: "Quản lý tài khoản",
        child: {
          add: {
            label: "Thêm tài khoản",
          },
          update: {
            label: "Cập nhật tài khoản",
          },
        },
      },

      userlog: {
        path: "userlog",
        label: "Nhật ký hoạt động",
      },
    },
  },

  providenumbers: {
    parentLabel: "Cấp số",
    path: "providenumbers",
    label: "Danh sách cấp số",
    child: {
      create: {
        path: "role",
        label: "Cấp số mới",
        child: {
          add: {
            label: "Thêm vai trò",
          },
          update: {
            label: "Cập nhật vai trò",
          },
        },
      },
      update: { path: "update", label: "Cập nhật dịch vụ" },
      detail: { path: "detail", label: "Chi tiết dịch vụ" },
    },
  },
};

export default function HeaderLayout() {
  const location = useLocation();
  const currentLocation = location.pathname
    .slice(1, location.pathname.length)
    .split("/");
  let arrLocation: any = [];
  const itemRender: any = (arr: any, type: any) => {
    if (arr.length == 1) {
      if (type != undefined && type[arr[0]] != undefined) {
        arrLocation.push({
          label: type[arr[0]]?.label,
          to: type[arr[0]]?.path,
          parentLabel: type[arr[0]]?.parentLabel,
        });
      }
      return;
    }
    if (arr.length > 1) {
      arrLocation.push({
        label: type[arr[0]]?.label,
        to: type[arr[0]]?.path,
        parentLabel: type[arr[0]]?.parentLabel,
      });
      const temp = arr[0];
      arr.shift();
      return itemRender(arr, type[temp]?.child);
    }
  };

  itemRender(currentLocation, typePath);

  return (
    <div style={{ width: "60vw", backgroundColor: "transparent" }}>
      {
        <Breadcrumb style={{ width: "60vw", backgroundColor: "transparent" }}>
          <BreadcrumbItem className="breadcrumb">
            {location.pathname === "/" ? (
              "Dashboard"
            ) : (
              <>
                {arrLocation?.map((item: any, index: any) => {
                  return (
                    <>
                      {item?.parentLabel ? (
                        <>
                          <Link
                            style={{
                              color: `${
                                index !== arrLocation.length - 1
                                  ? "#ff7506"
                                  : "#7E7D88"
                              }`,
                              marginRight: 15,
                              fontWeight: 700,
                              fontSize: 20,
                            }}
                            to={"/" + item.to}
                          >
                            {item?.parentLabel}
                          </Link>
                          <span
                            style={{
                              color: "#7E7D88",
                              marginRight: 15,
                              fontWeight: 700,
                              fontSize: 20,
                            }}
                          >
                            {">"}
                          </span>
                        </>
                      ) : null}

                      {index === arrLocation.length - 1 ? (
                        <span
                          style={{
                            color: `${"#ff7506"}`,
                            marginRight: 15,
                            fontWeight: 700,
                            fontSize: 20,
                          }}
                        >
                          {item?.label}
                        </span>
                      ) : (
                        <>
                          <Link
                            style={{
                              color: `${
                                index === arrLocation.length - 1
                                  ? "#ff7506"
                                  : "#7E7D88"
                              }`,
                              marginRight: 15,
                              fontWeight: 700,
                              fontSize: 20,
                            }}
                            to={"/" + item.to}
                          >
                            {item?.label}
                          </Link>
                        </>
                      )}

                      {index < arrLocation?.length - 1 ? (
                        <span
                          style={{
                            color: "#7E7D88",
                            marginRight: 15,
                            fontWeight: 700,
                            fontSize: 20,
                          }}
                        >
                          {">"}
                        </span>
                      ) : null}
                    </>
                  );
                })}
              </>
            )}
          </BreadcrumbItem>
        </Breadcrumb>
      }
    </div>
  );
}
