import { Hono } from "hono";
import { rootRouter } from "./rootRouter/rootRouter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";
import { prismaMiddleware } from "./prismaMiddleware/prismaMiddleware";
import { GoogleGenAI } from "@google/genai";
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
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(prismaMiddleware);
app.route("/api/v1", rootRouter);
export default app;
