import type { Context } from "hono";
import * as userModel from "../models/user.model.ts";
import { JsonResponse } from "../utils/JsonResponse.ts";

type creatUserBody = {
    username: string;
    password: string;
};

export const createUser = async (c: Context) => {
    try {
        const body = await c.req.json<creatUserBody>();
        if (!body.username || !body.password)
            return c.json(JsonResponse(false, "Missing Required fields"), 400);

        if (await userModel.isDuplicate(body.username)) {
            return c.json(JsonResponse(false, "Username or Password are exist!!!"), 400);
        }

        const newUser = await userModel.createUser(body.username, body.password);
        return c.json(JsonResponse(true, "Create user successful!", newUser), 200);
    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

export const getUserById = async (c: Context) => {
    try {
        const param = c.req.query("id");
        if (param !== undefined && param !== null) {
            const data = await userModel.getUserById(parseInt(param));
            return c.json(JsonResponse(true, "Get user success", data), 200);
        }
        return c.json(JsonResponse(false, "Id is required"), 400);
    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

export const getUserByUsername = async (c: Context) => {
    try {
        const param = c.req.query("username") || "";

        if (!param.trim()) {
            return c.json(JsonResponse(false, "Username is required"), 400);
        }

        const data = await userModel.getUserByUsername(param);
        return c.json(JsonResponse(true, "Get user success", data), 200);

    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

export const getUserProfile = async (c: Context) => {
    try {
        const userId = c.get("userId");
        const user = await userModel.getUserById(userId);

        if (!user) {
            return c.json(JsonResponse(false, "User not found"), 404);
        }

        return c.json(
            JsonResponse(true, "User found", {
                id: user.id,
                username: user.Username,
            })
        );
    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
};

type editUserNameBody = {
    username: string;
}

export const editUserName = async (c: Context) => {
    try {
        const userId = c.get("userId");
        const user = await c.req.json<editUserNameBody>();

        if (!user.username) {
            return c.json(JsonResponse(false, "Missing required field"), 400);
        }

        const data = await userModel.editUserName(userId, user.username);
        return c.json(JsonResponse(true, "Edit successful!", data), 200);
    } catch (e) {
        return c.json(JsonResponse(false, "Internal Server Error", e), 500);
    }
}

