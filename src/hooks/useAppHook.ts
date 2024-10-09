import useNotification from "./useNotification";
import { useRouter } from "next/navigation";

// Combined custom hook
export const useAppHooks = () => {
  const appRouter = useRouter();
  const appNotification = useNotification();

  return {
    appNotification,
    appRouter,
  };
};
