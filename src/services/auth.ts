// src/services/userApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get Opt reqbody
interface GetOtpReqBody {
  whatsAppNumber: string;
}

interface VerifyOtpReqBody extends GetOtpReqBody {
  otp: string;
}

interface VerifyOptResp {
  message: string;
  sessionId: string;
}

interface CreateAccountReqBody {
  password: string;
  sessionId: string;
}

interface AuthResp {
  status: string;
  message: string;
  userId: string;
  accessToken: string;
}

interface LoginAccountReqBody {
  userName: string;
  password: string;
}

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://9kxjnlnwq4.execute-api.ap-south-1.amazonaws.com/v1/api/",
  }),
  endpoints: (builder) => ({
    getOpt: builder.mutation<void, GetOtpReqBody>({
      query: (reqbody) => ({
        url: "send-otp",
        method: "POST",
        body: reqbody,
      }),
    }),

    verifyOpt: builder.mutation<VerifyOptResp, VerifyOtpReqBody>({
      query: (reqbody) => ({
        url: "verify-otp",
        method: "POST",
        body: reqbody,
      }),
    }),

    createAccount: builder.mutation<AuthResp, CreateAccountReqBody>({
      query: (reqbody) => ({
        url: "signup",
        method: "POST",
        body: reqbody,
      }),
    }),

    loginAccount: builder.mutation<AuthResp, LoginAccountReqBody>({
      query: (reqbody) => ({
        url: "login",
        method: "POST",
        body: reqbody,
      }),
    }),
  }),
});

export const {
  useGetOptMutation,
  useVerifyOptMutation,
  useCreateAccountMutation,
  useLoginAccountMutation,
} = authApi;

export default authApi;
