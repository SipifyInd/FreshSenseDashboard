// utils/authUtils.ts
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { setCookie } from "cookies-next";
import { errorHandler } from "./errorHandler";
import { AppRouterInstance, NotificationFunction } from "@/type";

export const signInUserWithToken = async (
  accessToken: string,
  appRouter: AppRouterInstance,
  openNotification: NotificationFunction
) => {
  try {
    const userCredential = await signInWithCustomToken(auth, accessToken);
    const idToken = await userCredential.user.getIdToken();

    // Store the ID token in a cookie
    setCookie("idToken", idToken, {
      path: "/",
      maxAge: 60 * 60 * 24,
      // httpOnly: true,
      // secure: false,
      // sameSite: "strict",
    });

    // Redirect to the dashboard
    appRouter.replace("/dashboard");
  } catch (error) {
    console.error("Error signing in with custom token:", error);
    errorHandler(error as Error, "Faild To SignIn.", openNotification);
  }
};
