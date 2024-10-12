// src/services/userApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface VerifySponsorId {
  status: string;
  message: string;
  verifiedName: string;
}

const accountApi = createApi({
  reducerPath: "accoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://9kxjnlnwq4.execute-api.ap-south-1.amazonaws.com/v1/api/",
  }),
  endpoints: (builder) => ({
    verifySponsorId: builder.mutation<
      VerifySponsorId,
      { sponsorId: string; reqbody: { userId: string; org: string } }
    >({
      query: ({ sponsorId, reqbody }) => ({
        url: `${sponsorId}/account`,
        method: "POST",
        body: reqbody,
      }),
    }),
  }),
});

export const { useVerifySponsorIdMutation } = accountApi;

export default accountApi;
