import { Hono } from "hono";
import { Bindings, Variables } from "../..";
import { authMiddleware } from "../../auth/authMiddleWare";
import z from "zod";
import { getBlogSchema } from "../../zodTypes/getBlogSchema";
import { StatusCodes } from "../../enums/enums";
export interface Env extends Bindings, Variables {
  Bindings: Bindings;
  Variables: Variables;
}
export const blogRouter = new Hono<Env>();
blogRouter.use(authMiddleware);
// first steps normal blogging site , create , read , update , delete
// while creating i want the user to either refine the given text in a certain tone or
// send it to AI with a prompt that the user desires to give.
// so there will be two seperate endpoints for both of these things
// one for refine , one for custom prompt
blogRouter.get("/blog", (c) => {
  const { success } = getBlogSchema.safeParse(c.req.query());
  if (!success) {
    return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
  }
  const userIdString = c.req.query("userId");
  if (!userIdString) {
    return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
  }
  const userId = parseInt(userIdString);
  return c.json("h");
});
