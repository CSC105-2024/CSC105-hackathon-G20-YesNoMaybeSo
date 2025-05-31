import type { Context } from "hono";
import * as groupItemModel from "../models/groupItems.models.ts";
import { JsonResponse } from "../utils/JsonResponse.ts";

export const getItemsInGroupItems = async (c: Context) => {
    try {
        const param = c.req.query("id");

        if (!param) {
            return c.json(JsonResponse(false, "Group Id is required"), 400);
        }

        const items = await groupItemModel.getItemsInGroupItems(parseInt(param));
        return c.json(JsonResponse(true, "Items fetched", items), 200);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

type createItemBody = {
    itemsName: string;
};

export const addItemToGroupItems = async (c: Context) => {
    try {
        const groupId = parseInt(c.req.query("id") || "");
        const body = await c.req.json<createItemBody>();

        if (isNaN(groupId) || !body.itemsName) {
            return c.json(JsonResponse(false, "Missing groupId or itemName"), 400);
        }

        const item = await groupItemModel.addItemToGroupItems(groupId, body.itemsName);
        return c.json(JsonResponse(true, "Item added", item), 201);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

export const deleteItemFromGroupItems = async (c: Context) => {
    try {
        const param = c.req.query("itemId");

        if (!param) {
            return c.json(JsonResponse(false, "Item Id is required"), 400);
        }

        const itemdeleted = await groupItemModel.deleteItemFromGroupItems(parseInt(param));

        return c.json(JsonResponse(true, "Item deleted", itemdeleted), 200);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};