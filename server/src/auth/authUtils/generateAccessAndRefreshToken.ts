import { generateAccessToken } from "./generateAccessToken";
import { generateJti } from "./generateJti";
import { generateRefreshToken } from "./generateRefreshToken";

export const generateAccessAndRefreshToken = async (
  userId: number,
  username: string,
  accessSecret: string,
  refreshSecret: string
) => {
  const expAccessToken = Date.now() / 1000 + 60 * 60 * 24;
  const expRefreshToken = expAccessToken * 7;
  const jti = generateJti();
  const accessTokenPayload = { userId, username, exp: expAccessToken };
  const refreshTokenPayload = { userId, jti, exp: expRefreshToken };
  const accessToken = await generateAccessToken(
    accessTokenPayload,
    accessSecret
  );
  const refreshToken = await generateRefreshToken(
    refreshTokenPayload,
    refreshSecret
  );
  return { accessToken, refreshToken, jti };
};
