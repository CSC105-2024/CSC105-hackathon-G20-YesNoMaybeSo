import { Hono } from "hono";
import * as resultController from "../controller/result.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts";

export const resultRouter = new Hono();

resultRouter.post("/add", AuthMiddleWare, resultController.createResult);
resultRouter.get("/summary/:roundId", AuthMiddleWare, resultController.getMatchSummary);
