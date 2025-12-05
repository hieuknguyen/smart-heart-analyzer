import { axiosClient, axiosClientFormData } from "./axiosClient";
import Cookies from "js-cookie";
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
export const loginWithToken = async () => {
  const token = Cookies.get("auth_token") || localStorage.getItem("auth_token");

  const res = await axiosClient.post("/auth/token", {
    token: `${token}`,
  });
  return res;
};
export const profileEdit = async (data) => {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const id = user?.id;
  console.log(id);
  const res = await axiosClient.put(`/profile/${id}`, data);
  return res;
};
