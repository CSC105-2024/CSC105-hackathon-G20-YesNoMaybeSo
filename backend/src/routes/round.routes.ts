import { Hono } from "hono";
import * as roundController from "../controller/round.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts";

export const roundRouter = new Hono();

roundRouter.use(AuthMiddleWare);

roundRouter.post("/", roundController.createRound);
roundRouter.get("/latest/:groupId", roundController.getLatestRoundInGroup);
roundRouter.patch("/start/:roundId", roundController.startRound);
roundRouter.get("/completed/:roundId", roundController.isRoundCompleted);
roundRouter.get("/isStarted/:roundId", roundController.isRoundStarted);
