import { notification } from "antd";
import { ReactNode } from "react";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

type NotificationType = "success" | "error" | "warning" | "info";
type NotificationPlacement =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

interface UseNotification {
  openNotification: (
    type: NotificationType,
    message: string,
    description?: string,
    placement?: NotificationPlacement,
    pauseOnHover?: boolean,
    showProgress?: boolean
  ) => void;
  contextHolder: ReactNode;
}

const useNotification = (): UseNotification => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: NotificationType,
    message: string,
    description?: string,
    placement: NotificationPlacement = "topRight",
    pauseOnHover = true,
    showProgress = true
  ) => {
    const icons: { [key in NotificationType]: ReactNode } = {
      success: <CheckCircleOutlined style={{ color: "green" }} />,
      error: <CloseCircleOutlined style={{ color: "red" }} />,
      warning: <ExclamationCircleOutlined style={{ color: "orange" }} />,
      info: <InfoCircleOutlined style={{ color: "blue" }} />,
    };

    api.open({
      message,
      description,
      icon: icons[type],
      pauseOnHover,
      showProgress,
      placement,
    });
  };

  return { openNotification, contextHolder };
};

export default useNotification;
