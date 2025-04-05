import { JWTPayload } from "hono/utils/jwt/types";

export interface RefreshTokenPayload extends JWTPayload {
  userId: number;
  jti: string;
  exp: number;
}
