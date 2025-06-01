import { Hono } from "hono";
import * as roundUserController from "../controller/roundUser.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts";

export const roundUserRoute = new Hono();

// User global Middleware on this router
roundUserRoute.use(AuthMiddleWare);

roundUserRoute.post("/add", roundUserController.addUserToRound);
roundUserRoute.post("/waiting", roundUserController.waitingUserToJoin);
roundUserRoute.patch("/complete/:id", roundUserController.markUserComplete);
roundUserRoute.patch("/join/:id", roundUserController.isUserJoined);
roundUserRoute.get("/check", roundUserController.isUserInRound);
roundUserRoute.get(
  "/waitingstatus/:roundId",
  roundUserController.checkAllUserCompleted
);
roundUserRoute.get("/available", roundUserController.getAvailableRounds);
roundUserRoute.post(
  "/joinTo/:roundUserId",
  roundUserController.joinUserToAvailableRound
);

roundUserRoute.get("/:roundId", roundUserController.getUsersInRound);
