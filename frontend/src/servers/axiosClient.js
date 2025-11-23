import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000/users",
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosClientFormData = axios.create({
  baseURL: "http://localhost:8000/users", // backend API URL: no header
  withCredentials: true,
});
export const axiosHeart = axios.create({
  baseURL: "http://localhost:8000/api/v1/prediction",
  headers: {
    "Content-Type": "application/json",
  },
});
