import { Axios } from "../utils/axiosInstance";

export type MatchItem = {
  id: number;
  name: string;
  count: number;
};

export type MatchSummary = {
  topMatched: MatchItem[];
  others: MatchItem[];
};

export const createResult = async (
  roundId: number,
  userId: number,
  itemId: number
) => {
  try {
    const res = await Axios.post(
      "/result",
      { roundId, userId, itemId },
      { withCredentials: true }
    );
    return res.data;
  } catch (e: any) {
    throw e;
  }
};

export const getMatchSummary = async (roundId: number) => {
  try {
    const res = await Axios.get(`/result/summary/${roundId}`, {
      withCredentials: true,
    });
    const data = res.data.data as MatchSummary;
    const mergedArray = [...data.topMatched, ...data.others];
    return {
      success: true,
      data: mergedArray,
    };
  } catch (e) {
    console.error("Match summary error", e);
    return {
      success: false,
      data: null,
    };
  }
};
