import { Hono } from "hono";
import { authRouter } from "./auth.routes.ts"
import { userRouter } from "./user.routes.ts";

export const mainRouter = new Hono();

mainRouter.route("/auth", authRouter);
mainRouter.route("/user", userRouter);