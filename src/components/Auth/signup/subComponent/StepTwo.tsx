"use client";

import React, { FC, useState, useEffect, useCallback } from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";
import { InputConfig, InputType } from "@/type";
import { getOtp, verifyOtp } from "@/services";
import Button from "@/components/Button";
import { errorHandler } from "@/utils";
import { useAppHooks } from "@/hooks";
import { useMutation } from "@tanstack/react-query";

interface StepTwoProps {
  handleTabNavigation: (index: number, selectedTab: number) => void;
  selectedTab: number;
}

const StepTwo: FC<StepTwoProps> = ({ handleTabNavigation, selectedTab }) => {
  const [isSubmitOtp, setIsSubmitOtp] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");

  const {
    appNotification: { contextHolder, openNotification },
  } = useAppHooks();

  // mutations
  const { mutate: otpMutate, isPending: isOtpPending } = useMutation({
    mutationFn: getOtp,
    onSuccess: () => {
      setWhatsAppNumber(form.getFieldValue("number"));
      setIsSubmitOtp(true);
      setResendTimer(30);
      setIsTimerActive(true);
    },
    onError: (error) => {
      console.log("Failed To Get OTP:", error);
      errorHandler(error as Error, "Failed To Get OTP", openNotification);
    },
  });

  const { mutate: otpVerifyMutate, isPending: isOtpVerifyPending } =
    useMutation({
      mutationFn: verifyOtp,
      onSuccess: () => {
        handleTabNavigation(selectedTab + 1, selectedTab);
      },
      onError: (error) => {
        console.log("Failed To Verify OTP:", error);
        errorHandler(error as Error, "Failed To Verify OTP", openNotification);
      },
    });

  const handleGetOtp = useCallback(
    async (values: { [key: string]: string }) => {
      otpMutate(values.number);
    },
    [otpMutate]
  );

  const handleVerification = useCallback(
    async (values: { [key: string]: string }) => {
      try {
        if (!whatsAppNumber) {
          throw new Error("WhatsApp number cannot be empty.");
        }

        otpVerifyMutate({ whatsAppNumber, otp: values.otp });
      } catch (error) {
        console.log("Invalid WhatsApp number:", error);
        errorHandler(error as Error, "Failed To Verify OTP", openNotification);
      }
    },
    [otpVerifyMutate, whatsAppNumber, openNotification]
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
        isLoading={isSubmitOtp ? isOtpVerifyPending : isOtpPending}
        buttonElement={
          <Button variant="text" onClick={handleBackClick}>
            Back
          </Button>
        }
      />
    </div>
  );
};

export default StepTwo;
