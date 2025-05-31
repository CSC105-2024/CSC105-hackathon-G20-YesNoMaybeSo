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

export const getprofile = async () => {
  try {
    const response = await Axios.get("/user/getprofile", {
      withCredentials: true,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null,
    };
  }
};

export const getProfile = async () => {
  const data = await Axios.get("/user/getprofile", { withCredentials: true });
  return data.data;
};

export const updateUsername = async (newUsername: string) => {
  const data = await Axios.put(
    "/user/updateusername",
    { username: newUsername },
    { withCredentials: true }
  );
  return data.data;
};

export const getuserid = async () => {
  try {
    const response = await Axios.get("/user/getprofile", {
      withCredentials: true,
    });
    return {
      success: true,
      user: response.data.data, 
    };
  } catch (e) {
    return {
      success: false,
      user: null,
    };
  }
};
