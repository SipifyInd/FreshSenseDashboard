import { NotificationFunction, RTKQueryError } from "@/type";

export const errorHandler = (
  error: RTKQueryError | Error,
  errorTitle?: string,
  openNotification?: NotificationFunction
) => {
  let message = "An unexpected error occurred."; // Declare the message variable

  // Check if it's an RTKQueryError
  if ("data" in error && error.data?.message) {
    message = error.data.message;
  }
  // Check if it's an instance of Error
  else if (error instanceof Error) {
    message = error.message;
  }

  openNotification?.("error", errorTitle || "Error", message, "bottomRight");
};
