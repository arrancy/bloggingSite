import { Hono } from "hono";
import { signupSchema } from "../../zodTypes/signupSchema";
import { prismaMiddleware } from "../../prismaMiddleware/prismaMiddleware";
import { Bindings, Variables } from "hono/types";
import { ExtendedPrismaClient } from "../..";

interface Env extends Bindings, Variables {
  Variables: Variables & {
    prisma: ExtendedPrismaClient;
  };
}

export const userRouter = new Hono<Env>();
userRouter.use(prismaMiddleware);
userRouter.post("/signup", async (c) => {
  const reqBody = await c.req.json();
  const { success } = signupSchema.safeParse(reqBody);
  if (!success) {
    return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
  }

  return c.text("hello hono");
});
