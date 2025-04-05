import { Hono } from "hono";
import { rootRouter } from "./rootRouter/rootRouter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { prismaMiddleware } from "./prismaMiddleware/prismaMiddleware";
const createPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate());
};
export type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
export interface Bindings {
  DATABASE_URL: string;
  RESEND_API_KEY: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}
export interface Variables {
  prisma: ExtendedPrismaClient;
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// app.use("/*", async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma);
//   await next();
// });
// this is useless, too many type errors, hence just used the
// basically when you create the prisma variable as new prismaClient, the types are not even extendable with the clients , but i have not tried with edge yet, but it turns into something dynamicClient something, the user and blog everything related to your database model gets attached to it.
app.use(prismaMiddleware);
app.route("/api/v1", rootRouter);
app.get("/", async (c) => {
  c;
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
  const { prisma } = c.var;
  const user = await prisma.user.create({
    data: {
      email: "abcde@exxamsasapdsdskdjskjdle.com",
      username: "ghghdsdsasasasasassdsdasagxhghg",
      password: "kddkddxkdk",
    },
  });
  return c.json({ user });
});

export default app;
