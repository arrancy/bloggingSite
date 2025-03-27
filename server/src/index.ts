import { Hono } from "hono";
import { rootRouter } from "./rootRouter/rootRouter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();
app.route("/api/v1", rootRouter);
app.get("/", async (c) => {
  return c.json({ msg: "hello hono" });
});

export default app;
