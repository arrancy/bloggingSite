import { sign } from "hono/jwt";
import { RefreshTokenPayload } from "../authTypes/RefreshTokenPayload";

export const generateRefreshToken = async (
  payload: RefreshTokenPayload,
  secret: string
) => {
  const refreshToken = await sign(payload, secret);
  return refreshToken;
};
