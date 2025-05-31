import type { Context } from "hono";
import * as groupModel from "../models/group.model.ts";
import { JsonResponse } from "../utils/JsonResponse.ts";

type CreateGroupBody = {
    groupName: string;
    userId: number;
};

export const createGroup = async (c: Context) => {
    try {
        const body = await c.req.json<CreateGroupBody>();

        if (!body.groupName || !body.userId) {
            return c.json(JsonResponse(false, "Missing groupName or userId"), 400);
        }

        const group = await groupModel.createGroup(body.groupName, body.userId);
        return c.json(JsonResponse(true, "Group created!", group), 200);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

type DeleteGroupBody = {
    groupId: number;
    userId: number;
};

export const deleteGroup = async (c: Context) => {
    try {
        const body = await c.req.json<DeleteGroupBody>();

        if (!body.groupId || !body.userId) {
            return c.json(JsonResponse(false, "Missing groupId or userId"), 400);
        }

        const result = await groupModel.deleteGroup(body.userId, body.groupId);
        return c.json(JsonResponse(true, "Group deleted", result), 200);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

type UpdateGroupBody = {
    groupId: number;
    groupName: string;
};

export const updateGroupName = async (c: Context) => {
    try {
        const body = await c.req.json<UpdateGroupBody>();

        if (!body.groupId || !body.groupName) {
            return c.json(JsonResponse(false, "Missing groupId or groupName"), 400);
        }

        const group = await groupModel.updateGroupName(body.groupId, body.groupName);
        return c.json(JsonResponse(true, "Group updated", group), 200);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

export const getGroupName = async(c: Context) => {
    try{
        const name = c.req.query("groupName") || "";

        if(!name) {
            return c.json(JsonResponse(false, "Group name is required"), 400);
        }

        const groupName = await groupModel.getGroupName(name);
        return c.json(JsonResponse(true, "Group name fetched", groupName), 400)

    } catch(e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
}

export const getGroupByUserId = async (c: Context) => {
    try {
        const userId = parseInt(c.req.query("userId") || "");

        if (!userId) {
            return c.json(JsonResponse(false, "User Id is required"), 400);
        }

        const groups = await groupModel.getGroupByUserId(userId);
        return c.json(JsonResponse(true, "Groups fetched", groups), 200);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

export const getGroupByGroupId = async(c: Context) => {
    try{
        const groupId = parseInt(c.req.query("groupId") || "");

        if(!groupId) {
            return c.json(JsonResponse(false, "Group id is required"), 400);
        }

        const groups = await groupModel.getGroupByGroupId(groupId);
        return c.json(JsonResponse(true, "Group is fetched",groups), 200);

    } catch(e) {
        return c.json(JsonResponse(false, "Internal Sever Error", e), 500);
    }
}

export const getGroupWithItems = async (c: Context) => {
    try {
        const groupId = parseInt(c.req.query("groupId") || "");

        if (!groupId) {
            return c.json(JsonResponse(false, "Group Id is required"), 400);
        }

        const result = await groupModel.getGroupWithItems(groupId);
        return c.json(JsonResponse(true, "Group with items fetched", result), 200);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};