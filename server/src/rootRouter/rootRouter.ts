import { Hono } from "hono";
import { userRouter } from "./userRouter/userRouter";
import { blogRouter } from "./blogrouter/blogRouter";
export const rootRouter = new Hono();
rootRouter.route("/user", userRouter);
rootRouter.route("/blog", blogRouter);
