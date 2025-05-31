import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { JsonResponse } from "../utils/JsonResponse.ts";
import * as jwt from "hono/jwt";

export const AuthMiddleWare = async (c: Context, next: Next) => {
  try {
    const authCookie = getCookie(c, "authToken");

    if (!authCookie) {
      return c.json(JsonResponse(false, "User Credential Not Found"), 401);
    }

    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) throw new Error("Missing JWT_SECRET in .env");

    try {
      const { id } = await jwt.verify(authCookie, SECRET);

      c.set("userId", id);

      return next();

    } catch (jwtError) {

      return c.json(JsonResponse(false, "Invalid User Creadential"), 401);
      
    }

  } catch (e) {
    console.log(e);

    return c.json(JsonResponse(false, "Internal Server Error", e), 500);
  }
};
