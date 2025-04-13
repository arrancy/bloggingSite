import { JWTPayload } from "hono/utils/jwt/types";

export interface AccessTokenPayload extends JWTPayload {
  username: string;
  userId: number;
  exp: number;
}
