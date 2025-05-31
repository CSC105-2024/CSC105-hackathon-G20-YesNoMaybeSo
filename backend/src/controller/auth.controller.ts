import type { Context } from "hono";
import { JsonResponse } from "../utils/JsonResponse.ts";
import * as userModel from "../models/user.model.ts";
import * as bcrypt from "bcrypt";
import * as jwt from "hono/jwt";
import { deleteCookie, setCookie } from "hono/cookie";

type RegisterPayload = {
  username: string;
  password: string;
};

type LoginPayload = {
  username: string;
  password: string;
};

export const Register = async (c: Context) => {
  try {
    const body = await c.req.json<RegisterPayload>();
    if (!body.password || !body.username) {
      return c.json(JsonResponse(false, "Missing Required Field"), 400);
    }

    //Check the duplicated of user
    const user = await userModel.getUserByUsername(body.username);

    if (user) {
      return c.json(JsonResponse(false, "Username already existed"), 400);
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await userModel.createUser(body.username, hashedPassword);

    return c.json(JsonResponse(true, "User created!", { id: newUser.id }), 201);
  } catch (e) {
    console.log(e);

    return c.json(JsonResponse(false, `Internal Server Error`, e), 500);
  }
};

export const Login = async (c: Context) => {
  try {
    const body = await c.req.json<LoginPayload>();

    if (!body.username || !body.password)
      return c.json(JsonResponse(false, "Missing Required field"), 400);

    const user = await userModel.getUserByUsername(body.username);

    if (!user) return c.json(JsonResponse(false, "User not found"), 400);

    const isPasswordMatch = await bcrypt.compare(body.password, user.Password);

    if (!isPasswordMatch)
      return c.json(JsonResponse(false, "Incorrect Password"), 400);

    const jwtPayload = {
      id: user.id,
    };

    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) throw new Error("Missing JWT_SECRET in .env file");

    const token = await jwt.sign(jwtPayload, SECRET);

    setCookie(c, "authToken", token);

    return c.json(JsonResponse(true, "Login Success!"), 200);
  } catch (e) {
    console.log(e);

    return c.json(JsonResponse(false, `Internal Server Error`, e), 500);
  }
};

export const Logout = async (c: Context) => {
  try {
    deleteCookie(c, "authToken", {
      path: "/",
      httpOnly: true,
      secure: false,
    });

    return c.json(
      {
        success: true,
        msg: "Logout Successful!",
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: e,
        msg: "Logout failed!!",
      },
      500
    );
  }
};
