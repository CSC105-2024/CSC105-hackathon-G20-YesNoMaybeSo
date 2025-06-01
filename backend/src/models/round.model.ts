import { db } from "../index.ts";

export const createRound = async (groupId: number) => {
  return db.round.create({
    data: {
      GroupId: groupId,
      isStarted: false,
    },
  });
};

export const getLatestRoundInGroup = async (groupId: number) => {
  return db.round.findFirst({
    where: {
      GroupId: groupId,
    },
    orderBy: {
      RoundId: "desc",
    },
  });
};

export const startRound = async (roundId: number) => {
  return db.round.update({
    where: {
      RoundId: roundId,
    },
    data: {
      isStarted: true,
    },
  });
};

export const isRoundCompleted = async (roundId: number) => {
  const users = await db.round_User.findMany({
    where: {
      RoundId: roundId,
    },
  });

  return users.length > 0 && users.every((u) => u.isComplete);
};

export const isRoundStarted = async (roundId: number) => {
  const round = await db.round.findFirst({
    where: {
      RoundId: roundId,
    },
  });

  if (!round) return false;

  return round.isStarted;
};
