import { Rule } from "antd/es/form";
import { useRouter } from "next/navigation";

export interface StepsComplete {
  [step: string]: boolean;
}

// Define InputType with specific allowed string values
export type InputType =
  | "text"
  | "password"
  | "email"
  | "radio"
  | "number"
  | "textarea"
  | "otp";

export type LabelAndValue = { label: string; value: string };

export interface InputConfig {
  label: string;
  name: string;
  placeholder?: string;
  rules?: Rule[];
  inputType?: InputType;
  required?: boolean;
  options?: LabelAndValue[];
  extra?: React.ReactNode;
}

export type NotificationFunction = (
  type: "success" | "error",
  title: string,
  message: string,
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
) => void;

export type AppRouterInstance = ReturnType<typeof useRouter>;

export interface AccountType {
  userName: string;
  password: string;
}
