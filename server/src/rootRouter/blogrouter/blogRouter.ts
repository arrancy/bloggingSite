import { Hono } from "hono";
import { Bindings, Variables } from "../..";
import { authMiddleware } from "../../auth/authMiddleWare";
import z from "zod";
import { getBlogSchema } from "../../zodTypes/getBlogSchema";
import { StatusCodes } from "../../enums/enums";
import { createBlogSchema } from "../../zodTypes/createBlogSchema";
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
blogRouter.get("/blog", async (c) => {
  try {
    const { success } = getBlogSchema.safeParse(c.req.query());
    if (!success) {
      return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
    }
    const blogIdString = c.req.query("userId");
    if (!blogIdString) {
      return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
    }
    const blogId = parseInt(blogIdString);
    if (isNaN(blogId)) {
      return c.json({ msg: "invalid request" }, StatusCodes.invalidInputs);
    }
    const { prisma, userId } = c.var;
    const blogObject = await prisma.blog.findFirst({ where: { id: blogId } });
    if (!blogObject) {
      return c.json({ msg: "blog does not exist" }, StatusCodes.notFound);
    }
    if (!(userId === blogObject.userId)) {
      return c.json({ msg: "blog is not yours " }, StatusCodes.conflict);
    }

    return c.json({ blogObject }, 200);
  } catch (error) {
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});

blogRouter.post("/blog", async (c) => {
  type ReqBody = z.infer<typeof createBlogSchema>;
  const reqBody: ReqBody = await c.req.json();
  const { success } = createBlogSchema.safeParse(reqBody);
  if (!success) {
    return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
  }
  const { title, content } = reqBody;
  const { prisma, userId } = c.var;
  const alreadyExists = await prisma.blog.findFirst({
    where: { title, content },
  });
  if (alreadyExists && !alreadyExists.isDraft) {
    return c.json(
      { msg: " duplicate content not allowed " },
      StatusCodes.conflict
    );
  }
  const blogCreated = await prisma.blog.create({
    data: { ...reqBody, userId },
  });
  if (!blogCreated) {
    return c.json(
      { msg: "could not create blog" },
      StatusCodes.internalServerError
    );
  }

  return c.json({ msg: "blog created successfully", blogCreated });
});
