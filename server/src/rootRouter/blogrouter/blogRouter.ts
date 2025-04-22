import { Hono } from "hono";
import { Bindings, Variables } from "../..";
import { authMiddleware } from "../../auth/authMiddleWare";
import z from "zod";
import { getBlogSchema } from "../../zodTypes/getBlogSchema";
import { StatusCodes } from "../../enums/enums";
import { createBlogSchema } from "../../zodTypes/createBlogSchema";
import { updateBlogSchema } from "../../zodTypes/updateBlogSchema";
import { deleteBlogSchema } from "../../zodTypes/deleteblogSchema";
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

blogRouter.put("/blog", async (c) => {
  try {
    type ReqBody = z.infer<typeof updateBlogSchema>;
    const reqBody: ReqBody = await c.req.json();
    const { success } = updateBlogSchema.safeParse(reqBody);
    if (!success) {
      return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
    }
    const { prisma, userId } = c.var;
    const { blogId } = reqBody;
    const blogObject = await prisma.blog.findFirst({ where: { id: blogId } });
    if (!blogObject) {
      return c.json({ msg: "blog not found" }, StatusCodes.notFound);
    }
    const blogAuthorId = blogObject.userId;
    if (!(userId === blogAuthorId)) {
      return c.json(
        { msg: "you are not the author of this blog" },
        StatusCodes.conflict
      );
    }
    // update code :
    const { title, content, isDraft } = reqBody;
    const updatedEntry = await prisma.blog.update({
      where: { id: blogId },
      data: { title, content, isDraft },
    });
    if (!updatedEntry) {
      return c.json(
        { msg: "could not update blog" },
        StatusCodes.internalServerError
      );
    }
    return c.json({ msg: "blog updated successfully", updatedEntry }, 200);
  } catch (error) {
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});
blogRouter.delete("/blog", async (c) => {
  try {
    type ReqBody = z.infer<typeof deleteBlogSchema>;
    const reqBody: ReqBody = await c.req.json();
    const { success } = deleteBlogSchema.safeParse(reqBody);
    if (!success) {
      return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
    }
    const { blogId } = reqBody;
    const { prisma, userId } = c.var;
    const blogObject = await prisma.blog.findFirst({ where: { id: blogId } });
    if (!blogObject) {
      return c.json({ msg: "blog not found" }, StatusCodes.notFound);
    }
    if (!(userId === blogObject.userId)) {
      return c.json(
        { msg: "you are not the author of the given blog " },
        StatusCodes.conflict
      );
    }
    const deletedObject = await prisma.blog.delete({ where: { id: blogId } });
    if (!deletedObject) {
      return c.json(
        { msg: "could not delete object " },
        StatusCodes.internalServerError
      );
    }
    return c.json({ msg: "blog deleted successfully" }, 200);
  } catch (error) {
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});
