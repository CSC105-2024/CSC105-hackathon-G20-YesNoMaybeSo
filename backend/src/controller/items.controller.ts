import { type Context } from "hono";
import * as itemsModel from "../models/items.model.ts"
import { JsonResponse } from "../utils/JsonResponse.ts";

export const getItemById = async (c: Context) => {
    try {
        const param = c.req.query("id");

        if (!param) {
            return c.json(JsonResponse(false, "Items Id is required"), 400);
        }

        const item = await itemsModel.getItemById(parseInt(param));

        if (!item) {
            return c.json(JsonResponse(false, "Items not found"), 404);
        }

        return c.json(JsonResponse(true, "Get items success", item), 200);
    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

export const deleteItem = async (c: Context) => {
    try {
        const param = c.req.query("id");

        if (!param) {
            return c.json(JsonResponse(false, "Item Id is required"), 400);
        }

        const deleted = await itemsModel.deleteItem(parseInt(param));
        return c.json(JsonResponse(true, "Item deleted", deleted), 200);
    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

export const getItemsByRoundId = async (c: Context) => {
    try {
      const roundId = Number(c.req.param("roundId"));
      if (isNaN(roundId)) {
        return c.json(JsonResponse(false, "Invalid roundId"), 400);
      }
  
      const items = await itemsModel.getItemsByRoundId(roundId);
      return c.json(JsonResponse(true, "Fetched items", items), 200);
    } catch (e) {
      return c.json(JsonResponse(false, "Failed to fetch items", e), 500);
    }
  };