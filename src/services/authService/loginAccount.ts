import { AccountType } from "@/type";
import axios from "axios";

const BASE_URL =
  "https://9kxjnlnwq4.execute-api.ap-south-1.amazonaws.com/v1/api/";

export const login = async ({ userName, password }: AccountType) => {
  const response = await axios.post(`${BASE_URL}login`, {
    userName,
    password,
  });
  return response.data;
};
