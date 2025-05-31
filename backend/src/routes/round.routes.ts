import { Hono } from "hono";
import * as roundController from "../controller/round.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts";

export const roundRouter = new Hono();

roundRouter.post("/", AuthMiddleWare, roundController.createRound);
roundRouter.get("/latest/:groupId", AuthMiddleWare, roundController.getLatestRoundInGroup);
roundRouter.patch("/start/:roundId", AuthMiddleWare, roundController.startRound);
roundRouter.get("/completed/:roundId", AuthMiddleWare, roundController.isRoundCompleted);
