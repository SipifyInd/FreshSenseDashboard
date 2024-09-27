"use client";

import React from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";
import { InputType } from "@/type";

const StepThree: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: string }) => {
    console.log("Form values:", values);
  };

  const inputConfigs = [
    {
      label: "Password",
      name: "password",
      placeholder: "Enter password",
      rules: [
        { required: true, message: "Please enter your password" },
        { min: 8, message: "Password must be at least 8 characters" },
        {
          pattern: /^[a-zA-Z0-9]*$/,
          message: "Password must contain only letters and numbers",
        },
      ],
      inputType: "password" as InputType,
    },
    {
      label: "Re-enter password",
      name: "reEnterPassword",
      placeholder: "Re-enter password...",
      rules: [
        { required: true, message: "Please re-enter your password" },
        ({ getFieldValue }: { getFieldValue: (name: string) => unknown }) => ({
          validator(_: unknown, value: string | undefined) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match"));
          },
        }),
      ],
      inputType: "password" as InputType,
    },
  ];

  return (
    <DynamicForm
      form={form}
      inputs={inputConfigs}
      onFinish={onFinish}
      buttonText="Submit"
    />
  );
};

export default StepThree;
