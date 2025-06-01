import type { Context } from "hono";
import * as resultModel from "../models/result.model.ts";
import { JsonResponse } from "../utils/JsonResponse.ts";

type CreateResultBody = {
    roundId: number;
    userId: number;
    itemId: number;
  };
  
  export const createResult = async (c: Context) => {
    try {
      const body = await c.req.json<CreateResultBody>();
      console.log("Received body:", body);  // Log ข้อมูลที่รับมา
  
      if (!body.roundId || !body.userId || !body.itemId) {
        return c.json(JsonResponse(false, "Missing required fields"), 400); 
      }
  
      const result = await resultModel.createResult(body.roundId, body.userId, body.itemId);
  
      return c.json(JsonResponse(true, "Result created", result), 200);
    } catch (e) {
      console.error("Error:", e);
      return c.json(JsonResponse(false, "Internal Server Error", e), 500); 
    }
  };

export const getMatchSummary = async (c: Context) => {
  try {
    const roundId = Number(c.req.param("roundId"));

    if (isNaN(roundId)) {
      return c.json(JsonResponse(false, "Invalid roundId"), 400);
    }

    const summary = await resultModel.getMatchSummary(roundId);

    return c.json(JsonResponse(true, "Summary fetched", summary), 200);

  } catch (e) {
    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};

  