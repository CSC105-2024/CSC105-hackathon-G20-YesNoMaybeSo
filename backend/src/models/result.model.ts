import { db } from "../index.ts";

export const createResult = async (roundId: number, userId: number, itemId: number) => {
  return db.result.create({
    data: {
      RoundId: roundId,
      UserId: userId,
      ItemId: itemId,
    },
  });
};

export const getMatchSummary = async (roundId: number) => {
  const results = await db.result.findMany({
    where: { RoundId: roundId },
    include: { Item: true }
  });

  const counts: any = {};
  for (const result of results) {
    const item = result.Item;
    if (counts[item.id]) {
      counts[item.id].count++;
    } else {
      counts[item.id] = {
        id: item.id,
        name: item.ItemName,
        count: 1
      };
    }
  }

  const summary: any[] = Object.values(counts);
  const maxCount = Math.max(...summary.map((item: any) => item.count));

  return {
    topMatched: summary.filter(item => item.count === maxCount),
    others: summary.filter(item => item.count < maxCount).sort((a, b) => b.count - a.count)
  };
};