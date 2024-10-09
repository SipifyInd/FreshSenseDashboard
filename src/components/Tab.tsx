/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, {
  createElement,
  FC,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { CompleteIcon } from "@/app/svg";
import classNames from "classnames";
import { StepsComplete } from "@/type";
import { useSpring, animated } from "@react-spring/web";

interface TabsObject {
  tabsText: string[];
  tabComponents: FC[];
}

type TabType = "straight";

type State = StepsComplete;

interface TabProps {
  tabsObject: TabsObject;
  tabType: TabType;
  children?: ReactNode;
  state?: State;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
  tabClickDisable: boolean;
  alignment?: "center";
}

const Tab: FC<TabProps> = ({
  tabsObject,
  children,
  tabType,
  state,
  selectedTab,
  setSelectedTab,
  tabClickDisable,
}) => {
  const { tabsText, tabComponents } = tabsObject;

  const getStepKey = useCallback((stepIndex: number): keyof StepsComplete => {
    return `steps${stepIndex}Complete` as keyof StepsComplete;
  }, []);

  const handleTabClick = useCallback(
    (index: number) => {
      if (!tabClickDisable) {
        setSelectedTab(index);
      }
    },
    [setSelectedTab, tabClickDisable]
  );

  const elementDivClass = useMemo(() => classNames("flex items-center"), []);

  const labelDivClass = useMemo(
    () => (index: number) =>
      classNames(
        "rounded-full flex justify-center items-center text-sm font-semibold",
        {
          "bg-cyan-400 text-white w-7 h-7": selectedTab === index,
          "border-none p-0 w-7 h-7":
            state?.[getStepKey(index + 1)] && selectedTab !== index,
          "text-gray-400 border border-gray-400 w-6 h-6":
            !state?.[getStepKey(index + 1)] && selectedTab !== index,
        }
      ),
    [selectedTab, state, getStepKey]
  );

  const ParentDivClass = useMemo(
    () =>
      classNames({
        "w-full": tabType === "straight",
      }),
    [tabType]
  );

  const isStepComplete = useCallback(
    (index: number): boolean => {
      return state ? state[getStepKey(index + 1)] || false : false;
    },
    [state, getStepKey]
  );

  return (
    <div className={ParentDivClass}>
      <div className="flex justify-between">
        <div className="inline-block">
          <div className={elementDivClass}>
            {tabsText.map((tabText, index) => {
              const isSelected = selectedTab === index;
              const isComplete = isStepComplete(index);

              return (
                <React.Fragment key={index}>
                  <button
                    className="font-opensans leading-6 py-1 whitespace-nowrap overflow-hidden text-ellipsis flex justify-center items-center"
                    onClick={() => handleTabClick(index)}
                    disabled={tabClickDisable}
                  >
                    {tabType === "straight" && (
                      <div className={labelDivClass(index)}>
                        {isComplete && !isSelected ? (
                          <CompleteIcon />
                        ) : (
                          index + 1
                        )}
                      </div>
                    )}
                    {tabType !== "straight" && tabText}
                  </button>

                  {tabType === "straight" && index < tabsText.length - 1 && (
                    <animated.div
                      style={useSpring({
                        height: "2px",
                        opacity: 1,
                        backgroundColor: isComplete
                          ? "rgb(103 232 249)"
                          : "rgb(229 231 235)",
                        config: { duration: 50 },
                      })}
                      className="transition-all w-36"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {children}
      </div>

      <div>{createElement(tabComponents[selectedTab])}</div>
    </div>
  );
};

export default Tab;
