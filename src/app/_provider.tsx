"use client";

import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/components/redux/store";

const Provider = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider store={store}> {children}</ReduxProvider>;
};

export default Provider;
