import { axiosClient, axiosClientFormData } from "./axiosClient";
export const registerUser = async (userInfor) => {
  const data = userInfor;
  const res = await axiosClient.post("/auth/", data);
  return res;
};
export const loginService = async (data) => {
  const res = await axiosClient.post("/auth/login", data);
  return res;
};
export const logoutService = async () => {
  const res = await axiosClient.post("/auth/logout");
  return res;
};
