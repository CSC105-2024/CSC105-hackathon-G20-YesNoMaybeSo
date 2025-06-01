import { Axios } from "../utils/axiosInstance";

export const createRound = async (groupId: number) => {
  try {
    const res = await Axios.post("/round", { groupId }, { withCredentials: true });
    return res.data;
  } catch (e) {
    return { success: false };
  }
};

export const getLatestRoundInGroup = async (groupId: number) => {
  try {
    const res = await Axios.get(`/round/latest/${groupId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    console.error("Failed to get latest round:", e);
    return { success: false, data: null };
  }
};