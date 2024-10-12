import React, { useState } from "react";
import { Form } from "antd";
import DynamicForm from "@/components/DynamicForm";
import Button from "@/components/Button";
import { InputConfig, RTKQueryError } from "@/type";
import { useVerifySponsorIdMutation } from "@/services/account";
import { useAppHooks } from "@/hooks";
import { errorHandler } from "@/utils";
import { selectAccountData } from "@/components/redux";

interface StepOneProps {
  selectedTab: number;
}

const StepOne: React.FC<StepOneProps> = ({ selectedTab }) => {
  const [form] = Form.useForm();

  const [verifySponsorId, { isLoading }] = useVerifySponsorIdMutation();

  const {
    appNotification: { contextHolder, openNotification },
    appRouter,
    appSelector,
  } = useAppHooks();

  const { userId } = appSelector(selectAccountData);

  const [verifedName, setverifedName] = useState<string>("");

  const onFinish = async (values: { [key: string]: string }) => {
    if (isLoading) return;

    if (!userId) {
      openNotification(
        "error",
        "Faild To Load Resource.",
        "Please try again later",
        "bottomRight"
      );
      return;
    }

    try {
      const reqbody = {
        userId,
        org: values.option,
      };

      const { verifiedName: respVerifedName } = await verifySponsorId({
        sponsorId: values.sponsorId,
        reqbody,
      }).unwrap();

      setverifedName(respVerifedName);
    } catch (error) {
      console.log("Failed To Verify SponsorId:", error);
      errorHandler(
        error as RTKQueryError,
        "Failed To Verify SponsorId",
        openNotification
      );
    }
  };

  const navigateHandler = () => {
    appRouter.replace("/dashboard");
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
        { label: "org_1", value: "1" },
        { label: "org_2", value: "2" },
      ],
      rules: [{ required: true, message: "Please select an organization!" }],
      required: false,
    },
  ];

  return (
    <>
      {contextHolder}
      <DynamicForm
        form={form}
        inputs={inputConfigs}
        onFinish={onFinish}
        buttonText={verifedName ? "Go To Dashboard" : "Verify"}
        isLoading={isLoading}
        verifedName={verifedName}
        navigateHandler={navigateHandler}
        buttonElement={
          <Button variant="text" onClick={navigateHandler}>
            Continue Without Sponsor ID
          </Button>
        }
        extra={
          verifedName && (
            <div className="inline-block text-green-500 border border-green-400 p-2 rounded-lg">
              <div className="flex gap-2 items-center">
                <p className="text-sm font-medium">Verifed Name:</p>
                <p>{verifedName}</p>
              </div>
            </div>
          )
        }
      />
    </>
  );
};

export default StepOne;
