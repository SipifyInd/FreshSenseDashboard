/* eslint-disable react/no-unescaped-entities */
"use client";

import DynamicForm from "@/components/DynamicForm";
import { useAppHooks } from "@/hooks";
import { useLoginAccountMutation } from "@/services/auth";
import { InputConfig, InputType, RTKQueryError } from "@/type";
import { errorHandler, signInUserWithToken } from "@/utils";
import { Form } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [form] = Form.useForm();

  const [loginAccount] = useLoginAccountMutation();

  const [isLoading, setisLoading] = useState<boolean>(false);

  const {
    appRouter,
    appNotification: { contextHolder, openNotification },
  } = useAppHooks();

  const onFinish = async (values: { [key: string]: string }) => {
    setisLoading(true);
    if (isLoading) return;

    try {
      const { accessToken } = await loginAccount({
        userName: values.username,
        password: values.password,
      }).unwrap();
      await signInUserWithToken(accessToken, appRouter, openNotification, true);
    } catch (error) {
      console.log("Failed Login Account", error);
      errorHandler(
        error as RTKQueryError,
        "Failed To Login Account",
        openNotification
      );
    } finally {
      setisLoading(false);
    }
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
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
