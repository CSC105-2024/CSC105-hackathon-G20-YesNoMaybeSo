import { Hono } from "hono";
import * as groupItemsController from "../controller/groupItems.controller.ts"
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts";

export const groupItemRouter = new Hono();

groupItemRouter.get("/", AuthMiddleWare, groupItemsController.getItemsInGroupItems);
groupItemRouter.post("/", AuthMiddleWare, groupItemsController.addItemToGroupItems);
groupItemRouter.delete("/", AuthMiddleWare, groupItemsController.deleteItemFromGroupItems);
