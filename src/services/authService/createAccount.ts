import { AccountType } from "@/type";
import axios from "axios";

const BASE_URL =
  "https://9kxjnlnwq4.execute-api.ap-south-1.amazonaws.com/v1/api/";

export const signUp = async ({ userName, password }: AccountType) => {
  const response = await axios.post(`${BASE_URL}signup`, {
    userName,
    password,
  });
  return response.data;
};

export const checkUsername = async (userName: string) => {
  try {
    const response = await axios.get(`${BASE_URL}check-username`, {
      params: { userName },
    });
    return response.data;
  } catch (error) {
    console.error("Error in checkUsername:", error);
    throw error;
  }
};
