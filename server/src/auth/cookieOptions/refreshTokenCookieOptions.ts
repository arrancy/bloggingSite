import { CookieOptions } from "hono/utils/cookie";

export const refreshTokenCookieOptions: CookieOptions = {
  path: "/",
  domain: "writeintelligent.blog",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "Strict",
};
// will change the path and domain  and add secure before pushing to prod.
