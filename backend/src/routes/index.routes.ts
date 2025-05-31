import { Hono } from "hono";
import { authRouter } from "./auth.routes.ts"
import { userRouter } from "./user.routes.ts";
import { groupRouter } from './group.routes.ts';
import { groupItemRouter } from "./groupItems.routes.ts";
import { itemRouter } from "./items.routes.ts";
import { resultRouter } from "./result.routes.ts";
import { roundRouter } from "./round.routes.ts";
import { roundUserRoute } from "./roundUser.routes.ts";


export const mainRouter = new Hono();

mainRouter.route("/auth", authRouter);
mainRouter.route("/user", userRouter);
mainRouter.route("/group", groupRouter);
mainRouter.route("/groupitem", groupItemRouter);
mainRouter.route("/item", itemRouter)
mainRouter.route("/result", resultRouter);
mainRouter.route("/round", roundRouter);
mainRouter.route("/rounduser", roundUserRoute);