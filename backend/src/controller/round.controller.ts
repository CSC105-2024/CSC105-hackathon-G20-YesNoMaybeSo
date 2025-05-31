import type { Context } from "hono";
import * as roundModel from "../models/round.model.ts";
import { JsonResponse } from "../utils/JsonResponse.ts";

type createRoundBody = {
    groupId: number;
}

export const createRound = async (c: Context) => {
  try {
    const body = await c.req.json<createRoundBody>();

    if (!body.groupId) {
      return c.json(JsonResponse(false, "Missing groupId"), 400);
    }

    const round = await roundModel.createRound(body.groupId);
    return c.json(JsonResponse(true, "Round created successful!", round), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Sever Error", e), 500);
  }
};

export const getLatestRoundInGroup = async (c: Context) => {
  try {
    const groupId = Number(c.req.param("groupId"));

    if (isNaN(groupId)) {
      return c.json(JsonResponse(false, "Missing groupId"), 400);
    }

    const round = await roundModel.getLatestRoundInGroup(groupId);
    return c.json(JsonResponse(true, "GetLatestRound success", round), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};

export const startRound = async (c: Context) => {
  try {
    const roundId = Number(c.req.param("roundId"));

    if (isNaN(roundId)) {
      return c.json(JsonResponse(false, "Invalid roundId"), 400);
    }

    const round = await roundModel.startRound(roundId);
    return c.json(JsonResponse(true, "Round was started!", round), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};

export const isRoundCompleted = async (c: Context) => {
  try {
    const roundId = Number(c.req.param("roundId"));

    if (isNaN(roundId)) {
      return c.json(JsonResponse(false, "Missing roundId"), 400);
    }

    const completed = await roundModel.isRoundCompleted(roundId);
    return c.json(JsonResponse(true, "Round was completed", completed), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};
