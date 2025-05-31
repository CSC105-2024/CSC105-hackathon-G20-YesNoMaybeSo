import { Hono } from "hono";
import * as authController from "../controller/auth.controller.ts";

export const authRouter = new Hono();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);
authRouter.get("/logout", authController.Logout);