import { Axios } from "../utils/axiosInstance";

export const getGroupsByUser = async (userId: number) => {
  try {
    const res = await Axios.get(`/group/byuser?userId=${userId}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (e) {
    console.error("Error fetching groups:", e);
    return [];
  }
};

export const getGroupById = async (groupId: number) => {
  try {
    const res = await Axios.get(`/group/byid?groupId=${groupId}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (e) {
    console.error("Failed to fetch group by id", e);
    return null;
  }
};

export const createCategory = async (categoryName: string, userId: number) => {
  try {
    const res = await Axios.post(
      "/group",
      { groupName: categoryName, userId },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    return { success: false, data: null };
  }
};

export const addCategoryItem = async (groupId: number, itemName: string) => {
  try {
    const res = await Axios.post(
      `/groupitem?id=${groupId}`,
      { itemsName: itemName },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    return { success: false, data: null };
  }
};