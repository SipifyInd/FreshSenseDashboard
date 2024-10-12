"use client";

import React, { useState } from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";
import { InputConfig, InputType, RTKQueryError } from "@/type";
import { useAppHooks } from "@/hooks";
import { errorHandler, signInUserWithToken } from "@/utils";
import { useCreateAccountMutation } from "@/services/auth";
import { setUserId } from "@/components/redux";

interface StepThreeProps {
  handleTabNavigation: (index: number, selectedTab: number) => void;
  selectedTab: number;
  sessionId: string;
}

const StepThree: React.FC<StepThreeProps> = ({
  sessionId,
  handleTabNavigation,
  selectedTab,
}) => {
  const [form] = Form.useForm();

  const {
    appNotification: { contextHolder, openNotification },
    appRouter,
    appDispatch,
  } = useAppHooks();

  const [createAccount] = useCreateAccountMutation();

  const [isLoading, setisLoading] = useState<boolean>(false);

  const onFinish = async (values: { [key: string]: string }) => {
    setisLoading(true);
    if (isLoading) return;

    if (!sessionId) {
      openNotification(
        "error",
        "Invalid Session. Unable To Create Account,",
        "Please try again later",
        "bottomRight"
      );
      return;
    }

    try {
      const { accessToken, userId } = await createAccount({
        password: values.password,
        sessionId,
      }).unwrap();

      appDispatch(setUserId(userId));

      await signInUserWithToken(
        accessToken,
        appRouter,
        openNotification,
        false
      );

      handleTabNavigation(selectedTab + 1, selectedTab);
    } catch (error) {
      console.log("Failed To Create Account:", error);
      errorHandler(
        error as RTKQueryError,
        "Failed To Create Account",
        openNotification
      );
    } finally {
      setisLoading(false);
    }
  };

  const inputConfigs: InputConfig[] = [
    {
      label: "Password",
      name: "password",
      placeholder: "Enter password",
      rules: [
        { required: true, message: "Please enter your password" },
        { min: 6, message: "Password must be at least 6 characters" },
        // {
        //   pattern: /^[a-zA-Z0-9]*$/,
        //   message: "Password must contain only letters and numbers",
        // },
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
    <>
      {contextHolder}
      <DynamicForm
        form={form}
        inputs={inputConfigs}
        onFinish={onFinish}
        buttonText="Submit"
        isLoading={isLoading}
      />
    </>
  );
};

export default StepThree;
