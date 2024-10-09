import React from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";
import Button from "@/components/Button";
import { InputConfig } from "@/type";

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
  const inputConfigs: InputConfig[] = [
    {
      label: "Sponsor ID (Referral ID)",
      name: "sponsorId",
      placeholder: "Enter Sponsor ID (Referral ID)...",
      rules: [{ required: true, message: "Please enter the Sponsor ID!" }],
      required: false,
      inputType: "text",
    },
    {
      label: "Select an Org",
      name: "option",
      inputType: "radio",
      options: [
        { label: "org_1", value: "org_1" },
        { label: "org_2", value: "org_2" },
      ],
      required: false,
    },
  ];

  return (
    <DynamicForm
      form={form}
      inputs={inputConfigs}
      onFinish={onFinish}
      buttonText="Next"
      buttonElement={
        <Button
          variant="text"
          onClick={() => handleTabNavigation(selectedTab + 1, selectedTab)}
        >
          Continue Without Sponsor ID
        </Button>
      }
    />
  );
};

export default StepOne;
