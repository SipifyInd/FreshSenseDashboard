"use client";

import React, { FC, useState } from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";
import { InputType } from "@/type";

interface StepTwoProps {
  handleTabNavigation: (index: number, selectedTab: number) => void;
  selectedTab: number;
}

const StepTwo: FC<StepTwoProps> = ({ handleTabNavigation, selectedTab }) => {
  const [isSubmitOtp, setIsSubmitOtp] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleGetOtp = (values: { [key: string]: string }) => {
    // Handle OTP request logic here
    console.log("Requesting OTP for:", values);
    setIsSubmitOtp(true);
  };

  const handleVerification = (values: { [key: string]: string }) => {
    console.log("Verifying OTP:", values);
    handleTabNavigation(selectedTab + 1, selectedTab);
  };

  // Input configuration for the dynamic form
  const inputConfig = isSubmitOtp
    ? [
        {
          label: "Verification Code",
          name: "otp",
          placeholder: "Enter OTP...",
          rules: [
            { required: true, message: "Please input your OTP!" },
            { pattern: /^[0-9]+$/, message: "Only numbers are allowed!" },
            { len: 6, message: "OTP must be exactly 6 digits!" }, // Assuming OTP is 6 digits
          ],
          inputType: "otp" as InputType,
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
      <DynamicForm
        form={form}
        inputs={inputConfig}
        onFinish={isSubmitOtp ? handleVerification : handleGetOtp}
        buttonText={isSubmitOtp ? "Verify" : "Get OTP"}
      />
    </div>
  );
};

export default StepTwo;
