import { db } from "../index.ts";

export const createGroup = async(groupName: string, userId: number) => {
    const group = await db.groups.create({
        data: {
            GroupName: groupName,
            User: {
                connect: {
                    id: userId,
                }
            }
        }
    })
    return group;
};

export const deleteGroup = async(groupId: number) => {
    const group = db.groups.delete({
        where: {
            GroupId: groupId
        }
    });
    return group;
};

export const updateGroupName = async(groupId: number, groupName: string) => {
    const group = db.groups.update(
        {
            where: {
                GroupId: groupId,
            }, data: {
                GroupName: groupName,
            }
        },
    );
    return group;
};

export const getGroupName = async(groupName: string) => {
    const group = await db.groups.findFirst({
        where: {
            GroupName:groupName,
        },
    });
    return group;
};

export const getGroupByUserId = async(userId: number) => {
    const group = await db.groups.findMany({
        where: {
            UserId: userId,
        }
    });
};

export const getGroupByGroupId = async(groupId: number) => {
    const group = await db.groups.findUnique({
        where: {
            GroupId: groupId,
        }
    });
};