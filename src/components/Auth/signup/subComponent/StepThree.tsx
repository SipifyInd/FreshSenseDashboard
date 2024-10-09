"use client";

import React from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";
import { InputConfig, InputType } from "@/type";
import { useAppHooks } from "@/hooks";
import { errorHandler, signInUserWithToken } from "@/utils";
import { signUp } from "@/services";
import { useMutation } from "@tanstack/react-query";

const StepThree: React.FC = () => {
  const [form] = Form.useForm();

  const {
    appNotification: { contextHolder, openNotification },
    appRouter,
  } = useAppHooks();

  const { mutate: signUpMutate, isPending: isSignUpPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      signInUserWithToken(data.accessToken, appRouter, openNotification);
    },
    onError: (error) => {
      console.log("Failed To Get OTP:", error);
      errorHandler(
        error as Error,
        "Failed To Create Account",
        openNotification
      );
    },
  });

  const onFinish = async (values: { [key: string]: string }) => {
    if (isSignUpPending) return;
    signUpMutate({
      userName: values.username,
      password: values.password,
    });
  };

  const inputConfigs: InputConfig[] = [
    {
      label: "UserName",
      name: "username",
      placeholder: "Enter username",
      rules: [{ required: true, message: "Please enter your username" }],
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter password",
      rules: [
        { required: true, message: "Please enter your password" },
        // { min: 8, message: "Password must be at least 8 characters" },
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
        isLoading={isSignUpPending}
      />
    </>
  );
};

export default StepThree;
