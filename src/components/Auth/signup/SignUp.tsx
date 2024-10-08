"use client";

import Tab from "@/components/Tab";
import React, { useState } from "react";
import StepOne from "./subComponent/StepOne";
import StepTwo from "./subComponent/StepTwo";
import StepThree from "./subComponent/StepThree";
import Link from "next/link";

const SignUp = () => {
  const [stepsComplete, setStepsComplete] = useState({
    steps1Complete: false,
    steps2Complete: false,
    step3Complete: false,
  });

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabNavigation = (index: number, selectedTab: number) => {
    const updatedState = { ...stepsComplete };
    const stepKey = `steps${
      selectedTab + 1
    }Complete` as keyof typeof stepsComplete;

    if (index > selectedTab) {
      updatedState[stepKey] = true;
    } else {
      updatedState[stepKey] = false;
    }

    setStepsComplete(updatedState);
    setSelectedTab(index);
  };

  const SignUpStepOne = () => {
    return (
      <StepOne
        handleTabNavigation={handleTabNavigation}
        selectedTab={selectedTab}
      />
    );
  };

  const SignUpStepTwo = () => {
    return (
      <StepTwo
        handleTabNavigation={handleTabNavigation}
        selectedTab={selectedTab}
      />
    );
  };

  return (
    <div className="bg-Pale-Cyan w-full h-screen flex justify-center items-center">
      <div className="bg-white border border-gray-300 rounded-xl shadow-gray-200 shadow-lg px-7 pt-7">
        <div className="mb-4">
          <h1 className="font-medium text-neutral-700">Create an Account</h1>
          <p className="text-neutral-600">
            Already Have an Account?{" "}
            <Link
              href="/auth/login"
              className="text-cyan-400 hover:text-cyan-600 underline text-sm"
            >
              Login
            </Link>
          </p>
        </div>
        <Tab
          tabsObject={{
            tabsText: ["dash", "dash", "dash"],
            tabComponents: [SignUpStepOne, SignUpStepTwo, StepThree],
          }}
          tabType="straight"
          state={stepsComplete}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabClickDisable={true}
          alignment="center"
        />
      </div>
    </div>
  );
};

export default SignUp;
