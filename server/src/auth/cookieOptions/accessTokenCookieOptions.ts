import { CookieOptions } from "hono/utils/cookie";

export const accessTokenCookieOptions: CookieOptions = {
  path: "/",
  domain: "localhost:8787",
  httpOnly: true,
  maxAge: 60 * 60 * 24,
  sameSite: "Strict",
};
