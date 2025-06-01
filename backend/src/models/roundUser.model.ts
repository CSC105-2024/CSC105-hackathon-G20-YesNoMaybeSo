import { db } from "../index.ts";

export const addUserToRound = async (roundId: number, userId: number) => {
  return db.round_User.create({
    data: {
      RoundId: roundId,
      UserId: userId,
    },
  });
};

export const getUsersInRound = async (roundId: number) => {
  return db.round_User.findMany({
    where: {
      RoundId: roundId,
    },
    include: {
      User: true,
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

export const markUserComplete = async (userId: number, roundId: number) => {
  const roundUser = await db.round_User.findMany({
    where: {
      RoundId: roundId,
      UserId: userId,
    },
  });
  if (roundUser.length < 1) return false;
  await db.round_User.update({
    where: {
      id: roundUser[0].id,
    },
    data: {
      isComplete: true,
    },
  });

  return true;
};

export const isUserJoined = async (roundUserId: number) => {
  return db.round_User.update({
    where: {
      id: roundUserId,
    },
    data: {
      isJoined: true,
    },
  });
};

export const isUserInRound = async (roundId: number, userId: number) => {
  const user = await db.round_User.findFirst({
    where: {
      RoundId: roundId,
      UserId: userId,
    },
  });
  return user !== null;
};

export const getRoundUsers = async (roundId: number) => {
  const users = await db.round_User.findMany({
    where: {
      RoundId: roundId,
    },
    include: {
      User: true,
    },
  });
  return users;
};

export const getUserLatestRound = async (userId: number) => {
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
  const rounds = await db.round_User.findMany({
    where: {
      UserId: userId,
      isComplete: false,
      isJoined: false,
      created_at: {
        gte: tenMinutesAgo,
      },
      Round: {
        isStarted: false,
      },
    },
    include: {
      Round: {
        include: {
          Group: {
            include: {
              User: {
                omit: {
                  Password: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return rounds;
};

export const joinUserToRound = async (roundUserId: number, userId: number) => {
  const round = await db.round_User.update({
    where: {
      id: roundUserId,
      UserId: userId,
    },
    data: {
      isJoined: true,
    },
  });

  return round;
};
