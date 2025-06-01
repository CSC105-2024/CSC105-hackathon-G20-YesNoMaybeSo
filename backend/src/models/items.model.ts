import { db } from "../index.ts";

export const getItemByRoundId = async (roundId: number) => {
  const items = await db.round.findFirst({
    where: {
      RoundId: roundId,
    },
    include: {
      Group: {
        include: {
          GroupItems: {
            include: {
              Item: true,
            },
          },
        },
      },
    },
  });
  if (!items) return [];
  console.log("hi");

  return items.Group.GroupItems.map((gi) => gi.Item);
};

export const deleteItem = async (itemId: number) => {
  const deleteItems = await db.item.delete({
    where: {
      id: itemId,
    },
  });
  return deleteItems;
};

export const getItemsByRoundId = async (groupItemId: number) => {
  return db.groupItem.findMany({
    where: {
      GroupId: groupItemId,
    },
    include: {
      Item: true,
    },
  });
};
