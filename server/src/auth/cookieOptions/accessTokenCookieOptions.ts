import { CookieOptions } from "hono/utils/cookie";

export const accessTokenCookieOptions: CookieOptions = {
  path: "/",
  domain: "localhost",
  // never mention port in the cookie domain for options , because cookies are only identified by domain and ports
  httpOnly: true,
  maxAge: 60 * 60 * 24,
  sameSite: "Strict",
};
