import { Hono } from "hono";
import * as itemsController from "../controller/items.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts";

export const itemRouter = new Hono();

itemRouter.get("/:roundId", AuthMiddleWare, itemsController.getItemById);
itemRouter.delete("/", AuthMiddleWare, itemsController.deleteItem);