import { Hono } from "hono";
import { rootRouter } from "./rootRouter/rootRouter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";
import { prismaMiddleware } from "./prismaMiddleware/prismaMiddleware";
import { GoogleGenAI } from "@google/genai";
import { getCookie } from "hono/cookie";
import { StatusCodes } from "./enums/enums";
import { verify } from "hono/jwt";
import { AccessTokenPayload } from "./auth/authTypes/AccessTokenPayload";
const createPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate());
};
export type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
export const createGenAi = () => {
  return new GoogleGenAI({});
};
type CreateGenAiType = ReturnType<typeof createGenAi>;
export interface Bindings {
  DATABASE_URL: string;
  RESEND_API_KEY: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  GEMINI_API_KEY: string;
}
export interface Variables {
  prisma: ExtendedPrismaClient;
  userId: number;
  ai: CreateGenAiType;
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
app.use(
  "*",
  cors({
    origin: "https://writeintelligent.blog",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(prismaMiddleware);
app.route("/api/v1", rootRouter);
app.get("/me", async (c) => {
  try {
    console.log("reached request");
    const receivedToken = getCookie(c, "access_token");
    console.log(receivedToken);
    if (!receivedToken) {
      return c.json({ msg: "unauthenticated" }, StatusCodes.unauthenticad);
    }
    const { ACCESS_TOKEN_SECRET } = c.env;
    const decoded = (await verify(
      receivedToken,
      ACCESS_TOKEN_SECRET
    )) as AccessTokenPayload;
    const { userId } = decoded;
    const { prisma } = c.var;
    const userExists = await prisma.user.findFirst({ where: { id: userId } });
    if (!userExists) {
      return c.json({ msg: "unauthenticated" }, StatusCodes.unauthenticad);
    }
    return c.json({ msg: "good to go!" }, 200);
  } catch (error) {
    console.log("here");
    return c.json({ msg: "unauthernticated" }, StatusCodes.unauthenticad);
  }
});
export default app;
