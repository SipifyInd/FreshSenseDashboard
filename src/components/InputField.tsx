"use client";

import React, { FC, useState } from "react";
import { Input } from "antd";
import { InputType } from "@/type";

const { Password, OTP } = Input;

interface InputFieldProps {
  placeHolder: string;
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  size?: "small" | "medium" | "large";
  inputType?: InputType;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const InputField: FC<InputFieldProps> = ({
  placeHolder,
  onChange,
  value,
  name,
  size = "small",
  inputType = "text",
  prefix,
  suffix,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const sizeClasses = {
    small: "h-8",
    medium: "h-10",
    large: "h-12",
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return inputType === "password" ? (
    <Password
      name={name}
      placeholder={placeHolder}
      value={value}
      onChange={handleChange}
      className={`w-full font-opensans rounded-md ${sizeClasses[size]}`}
      visibilityToggle={{
        visible: passwordVisible,
        onVisibleChange: togglePasswordVisibility,
      }}
      prefix={prefix}
      suffix={suffix}
    />
  ) : inputType === "otp" ? (
    <OTP value={value} onChange={(value) => onChange?.(value)} length={6} />
  ) : (
    <Input
      name={name}
      type={inputType}
      placeholder={placeHolder}
      value={value}
      onChange={handleChange}
      className={`w-full font-opensans rounded-md placeholder:text-gray-400 ${sizeClasses[size]}`}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

export default InputField;
