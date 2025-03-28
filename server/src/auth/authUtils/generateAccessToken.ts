import { AccessTokenPayload } from "../authTypes/AccessTokenPayload";
import { sign } from "hono/jwt";

export const generateAccessToken = async (
  payLoad: AccessTokenPayload,
  secret: string
) => {
  const accessToken = await sign(payLoad, secret);
  return accessToken;
};
