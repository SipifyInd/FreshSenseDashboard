import axios from "axios";

const BASE_URL =
  "https://9kxjnlnwq4.execute-api.ap-south-1.amazonaws.com/v1/api/";

interface VerifyOtpParams {
  whatsAppNumber: string;
  otp: string;
}

export const getOtp = async (whatsAppNumber: string) => {
  const response = await axios.post(`${BASE_URL}send-otp`, {
    whatsAppNumber,
  });
  return response.data;
};

export const verifyOtp = async ({ whatsAppNumber, otp }: VerifyOtpParams) => {
  const response = await axios.post(`${BASE_URL}verify-otp`, {
    whatsAppNumber,
    otp,
  });
  return response.data;
};
