import { shallowEqual, useDispatch, useSelector } from "react-redux";
import useNotification from "./useNotification";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/components/redux/store";

// Combined custom hook
export const useAppHooks = () => {
  // Define type for the selector function
  type Selector<T> = (state: RootState) => T;

  // Define type for the custom hook
  type UseCustomSelector = <T>(selector: Selector<T>) => T;

  // Custom hook to encapsulate useSelector(selector, shallowEqual)
  const useCustomSelector: UseCustomSelector = (selector) => {
    return useSelector(selector, shallowEqual);
  };

  // Custom hook to encapsulate useDispatch<AppDispatch>()
  const useAppDispatch = () => useDispatch<AppDispatch>();

  const appRouter = useRouter();
  const appNotification = useNotification();
  const appSelector = useCustomSelector;
  const appDispatch = useAppDispatch();

  return {
    appNotification,
    appRouter,
    appSelector,
    appDispatch,
  };
};
