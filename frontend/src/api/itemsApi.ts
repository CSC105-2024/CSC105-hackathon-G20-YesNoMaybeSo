import { Axios } from "../utils/axiosInstance";

export const getCardsByRoundId = async (roundId: number) => {
  const res = await Axios.get(`/item/${roundId}`, {
    withCredentials: true,
  });
  return res.data;
};
