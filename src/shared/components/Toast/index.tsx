import { notification } from "antd";
import "./Toast.scss";

type NotificationType = "success" | "info" | "warning" | "error";

export const publicToast = ({
  type,
  message,
  description,
}: {
  type: NotificationType;
  message: string;
  description?: string;
}) => {
  notification[type]({
    message,
    description,
    // duration: 2,
    placement: "bottom",
    duration: 3,
    closeIcon: false,
  });
};
