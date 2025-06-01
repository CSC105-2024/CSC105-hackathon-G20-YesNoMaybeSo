import { Axios } from "../utils/axiosInstance";

export const markUserComplete = async (id: number) => {
  return await Axios.patch(
    `/rounduser/complete/${id}`,
    {},
    { withCredentials: true }
  );
};

export const checkAllCompleted = async (roundId: number) => {
  const res = await Axios.get(`/rounduser/waitingstatus/${roundId}`, {
    withCredentials: true,
  });
  return res.data;
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

export const waitingUserToJoin = async (roundId: number, userIds: number[]) => {
  try {
    const res = await Axios.post(
      "/rounduser/waiting",
      { roundId, userIds },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    return { success: false };
  }
};

export const getUsersInRound = async (roundId: number) => {
  try {
    const res = await Axios.get(`/rounduser/${roundId}`, {
      withCredentials: true,
    });
    return res.data; // ✅ ควรมี { success: true, data: [...] }
  } catch (e) {
    console.error("Error fetching users in round:", e);
    return { success: false, data: [] };
  }
};

export const isUserInRound = async (roundId: number, userId: number) => {
  try {
    const res = await Axios.get(
      `/rounduser/check?roundId=${roundId}&userId=${userId}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    return { success: false, data: null };
  }
};

export type AvailableRound = {
  id: number;
  RoundId: number;
  UserId: number;
  isComplete: boolean;
  isJoined: boolean;
  Round: {
    Group: {
      GroupName: string;
      User: {
        Username: string;
      };
    };
  };
};

export const getAvailableRounds = async () => {
  try {
    const res = await Axios.get("/rounduser/available");
    return res.data.data as AvailableRound[];
  } catch (e) {
    return [];
  }
};

export const joinUserToRound = async (roundUserId: number) => {
  try {
    const res = await Axios.post(`/rounduser/joinTo/${roundUserId}`);
    return res.data.data.RoundId as number;
  } catch (e) {
    return -1;
  }
};
