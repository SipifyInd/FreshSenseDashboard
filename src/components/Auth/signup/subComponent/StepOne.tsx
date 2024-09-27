// StepOne.tsx
import React from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";

interface StepOneProps {
  handleTabNavigation: (index: number, selectedTab: number) => void;
  selectedTab: number;
}

const StepOne: React.FC<StepOneProps> = ({
  handleTabNavigation,
  selectedTab,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: string }) => {
    console.log("Form values:", values);
    handleTabNavigation(selectedTab + 1, selectedTab);
  };

  // Define your input configurations here
  const inputConfigs = [
    {
      label: "Sponsor ID (Referral ID)",
      name: "sponsorId",
      placeholder: "Enter Sponsor ID (Referral ID)...",
      rules: [{ required: true, message: "Please enter the Sponsor ID!" }],
    },
  ];

  return (
    <DynamicForm
      form={form}
      inputs={inputConfigs}
      onFinish={onFinish}
      buttonText="Next"
    />
  );
};

export default StepOne;
