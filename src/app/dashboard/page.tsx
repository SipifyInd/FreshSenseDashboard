import { Signout } from "@/components";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-screen text-lg  font-semibold">
      Welcome To Dashboard, You Have Onboarded Successfully.
      <div>
        <Signout />
      </div>
    </div>
  );
};

export default page;
