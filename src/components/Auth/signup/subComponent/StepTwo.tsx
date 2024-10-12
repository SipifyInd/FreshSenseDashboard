"use client";

import React, { FC, useState, useEffect, useCallback } from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";
import { InputConfig, InputType, RTKQueryError } from "@/type";
import Button from "@/components/Button";
import { errorHandler } from "@/utils";
import { useAppHooks } from "@/hooks";
import { useGetOptMutation, useVerifyOptMutation } from "@/services/auth";

interface StepTwoProps {
  handleTabNavigation: (index: number, selectedTab: number) => void;
  selectedTab: number;
  setsessionId: (sessionId: string) => void;
}

const StepTwo: FC<StepTwoProps> = ({
  handleTabNavigation,
  selectedTab,
  setsessionId,
}) => {
  const [isSubmitOtp, setIsSubmitOtp] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");

  const {
    appNotification: { contextHolder, openNotification },
  } = useAppHooks();

  const [getOtp, { isLoading: isGetOptLoading }] = useGetOptMutation();
  const [verifyOtp, { isLoading: isVerifyOptLoading }] = useVerifyOptMutation();

  const handleGetOtp = useCallback(
    async (values: { [key: string]: string }) => {
      try {
        await getOtp({ whatsAppNumber: values.number }).unwrap();
        setWhatsAppNumber(form.getFieldValue("number"));
        setIsSubmitOtp(true);
        setResendTimer(30);
        setIsTimerActive(true);
      } catch (error) {
        errorHandler(
          error as RTKQueryError,
          "Failed To Get OTP",
          openNotification
        );
      }
    },
    [form, getOtp, openNotification]
  );

  const handleVerification = useCallback(
    async (values: { [key: string]: string }) => {
      try {
        if (!whatsAppNumber) {
          throw new Error("WhatsApp number cannot be empty.");
        }

        const { sessionId } = await verifyOtp({
          whatsAppNumber,
          otp: values.otp,
        }).unwrap();

        setsessionId(sessionId);
        handleTabNavigation(selectedTab + 1, selectedTab);
      } catch (error) {
        console.log("Invalid WhatsApp number:", error);
        errorHandler(
          error as RTKQueryError,
          "Failed To Verify OTP",
          openNotification
        );
      }
    },
    [
      whatsAppNumber,
      verifyOtp,
      setsessionId,
      handleTabNavigation,
      selectedTab,
      openNotification,
    ]
  );

  // Start the timer countdown when the OTP is submitted
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(timer);
  }, [isTimerActive, resendTimer]);

  const handleResendOtp = useCallback(async () => {
    if (!isTimerActive) {
      const values = { number: form.getFieldValue("number") };
      await handleGetOtp(values);
      openNotification(
        "success",
        "OTP Resent Successfully.",
        `OTP sent to this WhatsApp number - ${form.getFieldValue("number")}`
      );
    }
  }, [isTimerActive, form, handleGetOtp, openNotification]);

  const handleBackClick = useCallback(() => {
    if (isSubmitOtp) {
      setIsSubmitOtp(false);
    } else {
      handleTabNavigation(selectedTab - 1, selectedTab);
    }
  }, [isSubmitOtp, selectedTab, handleTabNavigation]);

  // Input configuration for the dynamic form
  const inputConfig: InputConfig[] = isSubmitOtp
    ? [
        {
          label: "Verification Code",
          name: "otp",
          placeholder: "Enter OTP...",
          rules: [
            { required: true, message: "Please input your OTP!" },
            { pattern: /^[0-9]+$/, message: "Only numbers are allowed!" },
            { len: 6, message: "OTP must be exactly 6 digits!" },
          ],
          inputType: "otp" as InputType,
          extra: (
            <div className="w-full flex justify-end">
              {isTimerActive ? (
                <span className="text-xs">
                  Resend OTP in {resendTimer} seconds
                </span>
              ) : (
                <Button onClick={handleResendOtp} variant="text">
                  Resend OTP
                </Button>
              )}
            </div>
          ),
        },
      ]
    : [
        {
          label: "WhatsApp Number",
          name: "number",
          placeholder: "Enter Number...",
          rules: [
            { required: true, message: "Please input your number!" },
            { pattern: /^[0-9]+$/, message: "Only numbers are allowed!" },
            {
              min: 10,
              max: 15,
              message: "Phone number must be between 10 and 15 digits!",
            },
          ],
        },
      ];

  return (
    <div className="w-full">
      {contextHolder}
      <DynamicForm
        form={form}
        inputs={inputConfig}
        onFinish={isSubmitOtp ? handleVerification : handleGetOtp}
        buttonText={isSubmitOtp ? "Verify" : "Get OTP"}
        isLoading={isSubmitOtp ? isVerifyOptLoading : isGetOptLoading}
        buttonElement={
          isSubmitOtp && (
            <Button variant="text" onClick={handleBackClick}>
              Back
            </Button>
          )
        }
      />
    </div>
  );
};

export default StepTwo;
