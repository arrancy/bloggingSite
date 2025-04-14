import { sign } from "hono/jwt";
import { AccessTokenPayload } from "../authTypes/AccessTokenPayload";
export const generateAccessToken = async (
  payload: AccessTokenPayload,
  secret: string
) => {
  const accessToken = await sign(payload, secret);
  return accessToken;
};
