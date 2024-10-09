/* eslint-disable react/no-unescaped-entities */
"use client";

import DynamicForm from "@/components/DynamicForm";
import { useAppHooks } from "@/hooks";
import { login } from "@/services";
import { InputConfig, InputType } from "@/type";
import { errorHandler, signInUserWithToken } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";
import Link from "next/link";
import React from "react";

const Login = () => {
  const [form] = Form.useForm();

  const {
    appRouter,
    appNotification: { contextHolder, openNotification },
  } = useAppHooks();

  const { mutate: loginMutate, isPending: isLoadingPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      signInUserWithToken(data.accessToken, appRouter, openNotification);
    },
    onError: (error) => {
      console.log("Failed Login Account", error);
      errorHandler(error as Error, "Failed To Login Account", openNotification);
    },
  });

  const onFinish = async (values: { [key: string]: string }) => {
    if (isLoadingPending) return;
    loginMutate({
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
      rules: [{ required: true, message: "Please enter your password" }],
      inputType: "password" as InputType,
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="bg-Pale-Cyan w-full h-screen flex justify-center items-center">
        <div className="w-[25rem] bg-white border border-gray-300 rounded-xl shadow-gray-200 shadow-lg px-7 pt-7">
          <div>
            <h1 className="font-medium text-neutral-700">
              Welcome Back! Let's Get You Logged In
            </h1>
            <p className="text-neutral-600">
              No Account Yet?{" "}
              <Link
                href="/auth/signup"
                className="text-cyan-400 hover:text-cyan-600 underline text-sm"
              >
                Sign Up Now!
              </Link>
            </p>
          </div>
          <div>
            <DynamicForm
              form={form}
              inputs={inputConfigs}
              onFinish={onFinish}
              buttonText="Login"
              isLoading={isLoadingPending}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
