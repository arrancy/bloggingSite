import { Hono } from "hono";
import { Bindings, Variables } from "../..";
import { authMiddleware } from "../../auth/authMiddleWare";
import z from "zod";
import { getBlogSchema } from "../../zodTypes/getBlogSchema";
import { StatusCodes } from "../../enums/enums";
import { createBlogSchema } from "../../zodTypes/createBlogSchema";
import { updateBlogSchema } from "../../zodTypes/updateBlogSchema";
import { deleteBlogSchema } from "../../zodTypes/deleteblogSchema";
import { aiMiddleware } from "../../aiMiddleware/aiMiddleware";
import { aiModifySchema } from "../../zodTypes/aiModifySchema";

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
blogRouter.post("/ai/refine", aiMiddleware, async (c) => {
  try {
    type ReqBody = z.infer<typeof aiModifySchema>;
    const reqBody: ReqBody = await c.req.json();
    const { success } = aiModifySchema.safeParse(reqBody);
    if (!success) {
      return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
    }
    const { ai } = c.var;
    const { tone, instruction } = reqBody;
    if (!(tone || instruction)) {
      return c.json(
        { msg: "either give a tone or an instruction" },
        StatusCodes.conflict
      );
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents:
        "you are given a task to improve a snippet from a user's blog, ahead will be a json object with three fields : snippet, tone and instruction , the snippet field will show what exactly is the given text from the user's blog that you need to refine, the `tone` field will show in what tone should you refine the text, if that field is empty, you will receive a custom instruction as to how one should refine the text which will be in the third field as to how to refine the text. please respond in json format , if you successfully generate the refined text, your response will be a json and will have two fields :1.`success` which will be true and`text` which will have the refined text, if you are not able to understand user's desired tone for refinement or their instruction , kindly make success as false and the second field `text` will be empty. while responding please only give json object and nothing else , not even the ```json``` text at the beginning, none of the '\n' or anything at all which will result in an error while doing JSON.parse(). here is the json object : " +
        JSON.stringify(reqBody),
    });
    if (!response || !response?.candidates) {
      return c.json({ msg: "hello1" }, 409);
    }
    const result = response?.candidates[0].content?.parts;
    if (!result || !result[0].text) {
      return c.json({ msg: "hello3" }, 409);
    }
    const finalResult = result[0].text;
    const cleanedResult = finalResult.replace("```json", "").replace("```", "");
    const cleanedResultJson = JSON.parse(cleanedResult);
    if (!cleanedResultJson.success) {
      return c.json({ msg: "bad request" }, 401);
    }
    return c.json(cleanedResultJson, 200);
  } catch (error) {
    return c.json({ msg: "internal server error" }, StatusCodes.conflict);
  }
});

blogRouter.get("/blogsOfUser", async (c) => {
  try {
    const { prisma, userId } = c.var;
    const userExists = await prisma.user.findFirst({ where: { id: userId } });
    if (!userExists) {
      return c.json({ msg: "user does not exist" }, StatusCodes.notFound);
    }
    const blogs = await prisma.blog.findMany({ where: { userId } });
    if (!blogs) {
      return c.json({ msg: "blogs not found" }, StatusCodes.notFound);
    }
    return c.json({ msg: "blogs fetched successfully", blogs }, 200);
  } catch (error) {
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});
blogRouter.get("/allBlogs", async (c) => {
  try {
    const { prisma, userId } = c.var;
    const userExists = await prisma.user.findFirst({ where: { id: userId } });
    if (!userExists) {
      return c.json({ msg: "user does not exist" }, StatusCodes.notFound);
    }
    const allBlogs = await prisma.blog.findMany({ where: { isDraft: false } });
    if (!allBlogs) {
      return c.json({ msg: "blogs not found" }, StatusCodes.notFound);
    }
    return c.json({ msg: "blogs fetched successfully" }, 200);
  } catch (error) {
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});
blogRouter.get("/", async (c) => {
  try {
    const { success } = getBlogSchema.safeParse(c.req.query());
    if (!success) {
      return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
    }
    const blogIdString = c.req.query("blogId");
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

blogRouter.post("/", async (c) => {
  try {
    type ReqBody = z.infer<typeof createBlogSchema>;
    const reqBody: ReqBody = await c.req.json();
    const { success } = createBlogSchema.safeParse(reqBody);
    if (!success) {
      return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
    }
    const { title, content } = reqBody;
    const { prisma, userId } = c.var;
    console.log({ title, content });
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
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});

blogRouter.put("/", async (c) => {
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

blogRouter.delete("/", async (c) => {
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
