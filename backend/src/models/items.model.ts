import { db } from "../index.ts";

export const getItemById = async(itemsId: number) => {
    const items = await db.item.findUnique({
        where: {
            id: itemsId,
        }
    })
    return items;
}

export const deleteItem = async (itemId: number) => {
    const deleteItems = await db.item.delete({
        where: {
            id: itemId,
        }
    })
    return deleteItems;
};

export const getItemsByRoundId = async (groupItemId: number) => {
  return db.groupItem.findMany({
    where: { 
        GroupId: groupItemId 
    },
    include: {
      Item: true,
    },
  });
};