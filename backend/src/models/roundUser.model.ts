import { db } from "../index.ts";

export const addUserToRound = async (roundId: number, userId: number) => {
    return db.round_User.create({
      data: {
        RoundId: roundId,
        UserId: userId,
      },
    });
  };

export const waitingUserToJoin = async (roundId: number, userIds: number[]) => {
    return Promise.all(userIds.map((userId) => addUserToRound(roundId, userId)));
};

export const getUsersInRound = async (roundId: number) => {
    return db.round_User.findMany({
        where: {
            RoundId: roundId
        },
        include: {
            User: true
        },
    });
};

export const markUserComplete = async (roundUserId: number) => {

    await db.round_User.update({
        where: {
            id: roundUserId
        }, data: {
            isComplete: true
        },
    });

    return true;
};

export const isUserJoined = async (roundUserId: number) => {
    return db.round_User.update({
        where: { id: roundUserId },
        data: { isJoined: true },
    });
};

export const isUserInRound = async (roundId: number, userId: number) => {
    const user = await db.round_User.findFirst({
        where: { RoundId: roundId, UserId: userId },
    });
    return user !== null;
};