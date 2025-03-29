import { Hono } from "hono";
import { rootRouter } from "./rootRouter/rootRouter";
import { prismaMiddleware } from "./prismaMiddleware/prismaMiddleware";
export interface Bindings {
  DATABASE_URL: string;
}
export interface Variables {
  prisma: any;
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// app.use("/*", async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma);
//   await next();
// });
//this is useless, too many type errors, hence just used the

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
