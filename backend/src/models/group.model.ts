import { db } from "../index.ts";

export const createGroup = async(groupName: string, userId: number) => {
    const createGroup = await db.groups.create({
        data: {
            GroupName: groupName,
            User: {
                connect: {
                    id: userId,
                }
            }
        }
    })
    return createGroup;
};

export const deleteGroup = async(userId: number, groupId: number) => {
    const deleteGroup = await db.groups.deleteMany({
        where: {
            UserId: userId,
            GroupId: groupId,
        },
    });
    return deleteGroup;
};

export const updateGroupName = async(groupId: number, groupName: string) => {
    const updateGroup = db.groups.update(
        {
            where: {
                GroupId: groupId,
            }, data: {
                GroupName: groupName,
            }
        },
    );
    return updateGroup;
};

export const getGroupName = async(groupName: string) => {
    const getgroupName = await db.groups.findFirst({
        where: {
            GroupName:groupName,
        },
    });
    return getgroupName;
};

export const getGroupByUserId = async(userId: number) => {
    const getGroupByUser = await db.groups.findMany({
        where: {
            UserId: userId,
        }
    });
    return getGroupByUser;
};

export const getGroupByGroupId = async(groupId: number) => {
    const getGroupById = await db.groups.findUnique({
        where: {
            GroupId: groupId,
        }
    });
    return getGroupById;
};

export const getGroupWithItems = async (groupId: number) => {
    const getGroupAndItems = await db.groups.findUnique({
      where: {
        GroupId: groupId,
      },
      include: {
        GroupItems: {
          include: {
            Item: true,
          },
        },
      },
    });
    return getGroupAndItems;
  };