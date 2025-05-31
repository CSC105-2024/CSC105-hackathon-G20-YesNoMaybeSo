import { Hono } from "hono";
import * as roundUserController from "../controller/roundUser.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.middlewares.ts";

export const roundUserRoute = new Hono();

roundUserRoute.post("/add", AuthMiddleWare, roundUserController.addUserToRound);
roundUserRoute.post("/waiting", AuthMiddleWare, roundUserController.waitingUserToJoin);
roundUserRoute.get("/:roundId", AuthMiddleWare, roundUserController.getUsersInRound);
roundUserRoute.patch("/complete/:id", AuthMiddleWare, roundUserController.markUserComplete);
roundUserRoute.patch("/join/:id", AuthMiddleWare, roundUserController.isUserJoined);
roundUserRoute.get("/check", AuthMiddleWare, roundUserController.isUserInRound);
