import { Axios } from "../utils/axiosInstance";

export const getItemsInGroup = async (groupId: number) => {
  try {
    const res = await Axios.get(`/groupitem?id=${groupId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch items", err);
    return { success: false, data: [] };
  }
};


export const addItemToGroup = async (groupId: number, itemName: string) => {
  try {
    const res = await Axios.post(
      `/groupitem?id=${groupId}`,
      { itemsName: itemName },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to add item", err);
    return { success: false };
  }
};

export const deleteItemFromGroup = async (itemId: number) => {
  try {
    const res = await Axios.delete(`/groupitem?itemId=${itemId}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Failed to delete item", err);
    return { success: false };
  }
};
