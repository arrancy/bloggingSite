import { JWTPayload } from "hono/utils/jwt/types";

export interface RefreshTokenPayload extends JWTPayload {
  id: number;
  jti: string;
  deviceId: string;
  exp: number;
}
