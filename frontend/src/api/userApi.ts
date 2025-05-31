import { Axios } from "../utils/axiosInstance";

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await Axios.post(
      "/auth/register",
      { username, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (e: any) {
    throw e;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await Axios.post(
      "/auth/login",
      { username, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (e: any) {
    throw e;
  }
};
