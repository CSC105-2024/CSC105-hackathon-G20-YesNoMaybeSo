import { Axios } from "../utils/axiosInstance";

export const markUserComplete = async (id: number) => {
  return await Axios.patch(`/rounduser/complete/${id}`, {}, { withCredentials: true });
};

export const getCardsByRoundId = async (roundId: number) => {
    try {
      const res = await Axios.get(`/item/${roundId}`, { withCredentials: true });
      return res.data;
    } catch (e) {
      console.error("Fetch item failed", e);
      return { success: false, data: [] };
    }
  };

  export const checkAllCompleted = async (roundId: number) => {
    try {
      const res = await Axios.get(`/rounduser/waitingstatus/${roundId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      console.error("polling error:", e);
      return { success: false, data: false };
    }
  };