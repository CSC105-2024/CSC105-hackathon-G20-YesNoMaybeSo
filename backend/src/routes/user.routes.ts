import { Hono } from "hono";
import * as userController from "../controller/user.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts"

export const userRouter = new Hono();

userRouter.post("/createuser", userController.createUser);
userRouter.get("/getusername", userController.getUserByUsername);
userRouter.get("/getuserid", userController.getUserById);
userRouter.get("/getprofile", AuthMiddleWare, userController.getUserProfile);
userRouter.put("/updateusername", AuthMiddleWare, userController.editUserName);