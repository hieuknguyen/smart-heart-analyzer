import { axiosHeart } from "./axiosClient";
export const postECGAnalyze = async (data) => {
  const res = await axiosHeart.post("/heart_disease", data);
  return res;
};
