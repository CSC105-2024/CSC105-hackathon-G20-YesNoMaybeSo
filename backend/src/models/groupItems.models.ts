import { db } from "../index.ts";

export const addItemToGroupItems = async (groupId: number, itemName: string) => {
    const addItems = await db.item.create({
        data: {
            ItemName: itemName,
            GroupItems: {
                create: {
                    Group: {
                        connect: {
                            GroupId: groupId
                        },
                    },
                },
            },
        },
    });

    return addItems;
};

export const getItemsInGroupItems = async (groupId: number) => {
    const getItems = await db.item.findMany({
      where: {
        GroupItems: {
          some: {
            GroupId: groupId,
          },
        },
      },
      select: {
        id: true,
        ItemName: true,
      },
    });

    return getItems;
  };
  

export const deleteItemFromGroupItems = async (itemId: number) => {
    await db.groupItem.deleteMany({
        where: { 
            ItemId: itemId 
        },
    });

    const deletedItem = await db.item.delete({
        where: { id: itemId },
    });

    return deletedItem;
};