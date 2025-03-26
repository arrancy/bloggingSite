import { Hono } from "hono";
import { rootRouter } from "./rootRouter/rootRouter";
type Bindings = {
  DATABASE_URL: string;
};
const app = new Hono<{ Bindings: Bindings }>();
app.route("/api/v1", rootRouter);
app.get("/", (c) => {
  return c.json({ msg: "hello hono" });
});

export default app;
