import { db } from "../index.ts";

export const addUserToRound = async (roundId: number, userId: number) => {
    return db.round_User.create({
        data: {
            RoundId: roundId,
            UserId: userId,
        },
    });
};

// export const waitingUserToJoin = async (roundId: number, userIds: number[]) => {
//     return Promise.all(userIds.map((userId) => addUserToRound(roundId, userId)));
// };

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

export const waitingUserToJoin = async (roundId: number, userIds: number[]) => {
  const userCreationTasks = userIds.map((uid) =>
    db.round_User.create({
      data: {
        Round: { connect: { RoundId: roundId } },
        User: { connect: { id: uid } },
        isJoined: uid === userIds[0],
      },
    })
  );
  return await Promise.all(userCreationTasks);
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
        where: {
            id: roundUserId
        },
        data: {
            isJoined: true
        },
    });
};

export const isUserInRound = async (roundId: number, userId: number) => {
    const user = await db.round_User.findFirst({
        where: {
            RoundId: roundId,
            UserId: userId
        },
    });
    return user !== null;
};

export const getRoundUsers = async (roundId: number) => {
    const users = await db.round_User.findMany({
        where: {
            RoundId: roundId,
        }, include: {
            User: true
        }
    });
    return users;
};