import { NotificationFunction } from "@/type";

interface AxiosError extends Error {
  response?: {
    data: {
      message: string;
      error?: string;
    };
  };
}

export const errorHandler = (
  error: AxiosError,
  errorTitle?: string,
  openNotification?: NotificationFunction
) => {
  const message =
    error.response?.data.error ||
    error.response?.data.message ||
    "An unexpected error occurred.";
  openNotification?.("error", errorTitle || "Error", message, "bottomRight");
};
