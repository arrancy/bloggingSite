import { createMiddleware } from "hono/factory";
import { Bindings, Variables } from "..";
import { verify } from "hono/jwt";
import { AccessTokenPayload } from "./authTypes/AccessTokenPayload";
import { StatusCodes } from "../enums/enums";

export const authMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  try {
    const token = c.req.header("Authorization");
    if (!token) {
      return c.json({ msg: "unauthenticated" }, StatusCodes.unauthenticad);
    }
    const { prisma } = c.var;
    const { ACCESS_TOKEN_SECRET } = c.env;
    const decoded = (await verify(
      token,
      ACCESS_TOKEN_SECRET
    )) as AccessTokenPayload;

    const { userId, username } = decoded;
    const userExists = await prisma.user.findFirst({
      where: { id: userId, username },
    });
    if (!userExists) {
      return c.json({ msg: "unauthenticated" }, StatusCodes.unauthenticad);
    }
    c.set("userId", userId);
    await next();
  } catch (error) {
    return c.json({ msg: "unauthenticated" }, StatusCodes.unauthenticad);
  }
});
