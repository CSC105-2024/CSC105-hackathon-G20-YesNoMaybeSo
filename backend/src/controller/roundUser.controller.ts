import type { Context } from "hono";
import * as roundUserModel from "../models/roundUser.model.ts";
import { JsonResponse } from "../utils/JsonResponse.ts";

type addUserToRoundBody = {
    roundId: number;
    userId: number;
}

export const addUserToRound = async (c: Context) => {
  try {
    const body = await c.req.json<addUserToRoundBody>();

    if (!body.roundId || !body.userId) {
      return c.json(JsonResponse(false, "Missing roundId or userId"), 400);
    }

    const result = await roundUserModel.addUserToRound(body.roundId, body.userId);
    return c.json(JsonResponse(true, "User added to round", result), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};

type waitingUserToJoinBody = {
    roundId: number;
    userIds: number[];
}

export const waitingUserToJoin = async (c: Context) => {
  try {
    const body = await c.req.json<waitingUserToJoinBody>();

    if (!body.roundId || !Array.isArray(body.userIds)) {
      return c.json(JsonResponse(false, "RoundId or userIds was missing or incorrect"), 400);
    }

    const result = await roundUserModel.waitingUserToJoin(body.roundId, body.userIds);
    return c.json(JsonResponse(true, "Add user to room!", result), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};

export const getUsersInRound = async (c: Context) => {
  try {
    const roundId = Number(c.req.param("roundId"));

    if (isNaN(roundId)) {
      return c.json(JsonResponse(false, "Round is incorrect"), 400);
    }

    const users = await roundUserModel.getUsersInRound(roundId);
    return c.json(JsonResponse(true, "Get user in that round", users), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};

export const markUserComplete = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json(JsonResponse(false, "Invalid roundUserId"), 400);
    }

    const result = await roundUserModel.markUserComplete(id);
    return c.json(JsonResponse(true, "User completed!", result), 200);
  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};


export const isUserJoined = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));

    if (isNaN(id)) {
      return c.json(JsonResponse(false, "Id is missing"), 400);
    }

    const result = await roundUserModel.isUserJoined(id);
    return c.json(JsonResponse(true, "User joined!", result), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};

export const isUserInRound = async (c: Context) => {
  try {
    const roundId = Number(c.req.query("roundId"));
    const userId = Number(c.req.query("userId"));

    if (isNaN(roundId) || isNaN(userId)) {
      return c.json(JsonResponse(false, "Invalid roundId or userId"), 400);
    }

    const exists = await roundUserModel.isUserInRound(roundId, userId);
    return c.json(JsonResponse(true, "User is already in!", exists), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};
