"use client";

import { useAppHooks } from "@/hooks";
import React, { useState } from "react";
import Button from "../Button";
import { deleteCookie } from "cookies-next";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { errorHandler } from "@/utils";

const Signout = () => {
  const {
    appRouter,
    appNotification: { contextHolder, openNotification },
  } = useAppHooks();
  const [isLoading, setisLoading] = useState<boolean>(false);

  const logOutHandler = async () => {
    if (isLoading) return;
    setisLoading(true);
    try {
      deleteCookie("idToken");

      await signOut(auth);

      appRouter.replace("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
      errorHandler(error as Error, "Faild To Logout.", openNotification);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Button loading={isLoading} onClick={logOutHandler}>
        Logout
      </Button>
    </>
  );
};

export default Signout;
