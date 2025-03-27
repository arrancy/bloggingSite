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
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate());
  // const user = await prisma.user.create({
  //   data: {
  //     email: "abc@example.com",
  //     username: "helloabc",
  //     password: "abchello",
  //   },
  // });
  // if (!user) {
  //   c.json({ msg: "sad" }, 401);
  // }
  // return c.json({ user });
  return c.text("hello hono");
});

export default app;
