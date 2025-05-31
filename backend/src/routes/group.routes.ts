import { Hono } from "hono";
import * as groupController from "../controller/group.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts";

export const groupRouter = new Hono();


groupRouter.post("/",AuthMiddleWare, groupController.createGroup);
groupRouter.delete("/", AuthMiddleWare, groupController.deleteGroup);
groupRouter.patch("/update", AuthMiddleWare, groupController.updateGroupName);
groupRouter.get("/name", AuthMiddleWare, groupController.getGroupName);
groupRouter.get("/byuser", AuthMiddleWare, groupController.getGroupByUserId);
groupRouter.get("/byid", AuthMiddleWare, groupController.getGroupByGroupId);
groupRouter.get("/with-items", AuthMiddleWare, groupController.getGroupWithItems);