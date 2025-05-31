import type { Context } from "hono";
import * as groupController from "../models/group.model.ts";
import { JsonResponse } from "../utils/JsonResponse.ts";
import { db } from "../index.ts";

type createGroupBody = {
    groupname: string;
    userId: number;
}

export const createGroup = async (c: Context) => {
    try {
        const body = await c.req.json<createGroupBody>();
        if (!body.groupname) {
            return c.json(JsonResponse(false, "Missing required fields"), 400);
        }

        const isGroupDuplicate = await groupController.getGroupName(body.groupname);

        if (isGroupDuplicate) {
            return c.json(JsonResponse(false, "This group is already exist!"), 400);
        }

        const newGroup = await groupController.createGroup(body.groupname, body.userId)

        return c.json(JsonResponse(true, "Crate Category successful!", newGroup), 200);
    } catch(e) {
        return c.json(JsonResponse(false, "Internal Server Error"),500);
    }
}