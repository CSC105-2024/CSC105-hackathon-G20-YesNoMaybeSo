import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/index.js";
import { cors } from "hono/cors";
import { mainRouter } from "./routes/index.routes.ts";
import { logger } from "hono/logger";

const app = new Hono();

export const db = new PrismaClient();
app.use(logger());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("", mainRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

process.on("beforeExit", async () => {
  await db.$disconnect();
});
