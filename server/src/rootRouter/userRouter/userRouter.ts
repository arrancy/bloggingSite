import { Hono } from "hono";
import { signupSchema } from "../../zodTypes/signupSchema";
import { prismaMiddleware } from "../../prismaMiddleware/prismaMiddleware";
import { Bindings } from "../..";
import { Variables } from "../..";
import z from "zod";
import bcrypt from "bcrypt-edge";
import { Resend } from "resend";
import { generateAccessToken } from "../../auth/authUtils/generateAccessToken";
import { generateJti } from "../../auth/authUtils/generateJti";
import { generateRefreshToken } from "../../auth/authUtils/generateRefreshToken";
import { setCookie } from "hono/cookie";
import { accessTokenCookieOptions } from "../../auth/cookieOptions/accessTokenCookieOptions";
import { refreshTokenCookieOptions } from "../../auth/cookieOptions/refreshTokenCookieOptions";
interface Env extends Variables, Bindings {
  Bindings: Bindings;
  Variables: Variables;
}
type SignupBody = z.infer<typeof signupSchema>;

const generateVerificationToken = () => crypto.randomUUID();

export const userRouter = new Hono<Env>();
userRouter.use(prismaMiddleware);
userRouter.post("/signup", async (c) => {
  try {
    const reqBody: SignupBody = await c.req.json();
    const { success } = signupSchema.safeParse(reqBody);
    if (!success) {
      return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
    }
    const { prisma } = c.var;
    const userExists = await prisma.user.findFirst({
      where: { email: reqBody.email },
    });
    if (userExists) {
      return c.json({ msg: "user already exists" }, StatusCodes.userExists);
    }
    const verificationToken = generateVerificationToken();
    const tommorowTime = new Date();
    tommorowTime.setDate(tommorowTime.getDate() + 1);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(reqBody.password, salt);
    const { email, username } = reqBody;

    const userCreated = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        verification_token: {
          create: {
            token: verificationToken,
            expiresAt: tommorowTime.toISOString(),
          },
        },
      },
    });
    if (!userCreated) {
      return c.json(
        { msg: "internal server error" },
        StatusCodes.internalServerError
      );
    }
    const verificationUrl = `http://localhost:8787?verificationToken=${verificationToken}`;

    //logic to redirect the user to frontend page where it says to check email to verify it
    //signin will check if the person is verified or not, only then a token will be issued

    const resend = new Resend(c.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "no-reply@verify.writeintelligent.blog",
      to: email,
      subject: "verify your email",
      html: `<p>to verify your email, click <a href=${verificationUrl}>here</a></p>`,
    });
    console.log(data);
    if (error) {
      return c.json(
        { msg: "internal server error" },
        StatusCodes.internalServerError
      );
    }
    return c.redirect("http://myfrontendUrl.abc/emailPage");
  } catch (error) {
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
  // c.redirect(`http://localhost8787/api/v1/user/verifyEmail`)
  // const verificationTokenAdded = await prisma.verification_token.create({
  //   data: { token: verificationToken, userId: userCreated.id },
  // });
});
userRouter.get("/verify", async (c) => {
  try {
    const verification_token = c.req.query("verificationToken");
    if (!verification_token) {
      return c.json({ msg: "bad request" }, StatusCodes.invalidInputs);
    }
    const { prisma } = c.var;
    const userExists = await prisma.user.findFirst({
      where: { verification_token: { token: verification_token } },
    });
    if (!userExists) {
      return c.json(
        { msg: "invalid verification token" },
        StatusCodes.unauthenticad
      );
    }
    const { id, username } = userExists;
    const verifyUser = await prisma.user.update({
      where: { id },
      data: { verified: true },
    });
    if (!verifyUser) {
      return c.json(
        { msg: "internal server error" },
        StatusCodes.internalServerError
      );
    }
    const { ACCESS_TOKEN_SECRET } = c.env;
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    const accessTokenPayload = {
      id,
      username,
      exp,
    };
    const accessToken = await generateAccessToken(
      accessTokenPayload,
      ACCESS_TOKEN_SECRET
    );
    const refreshTokenJti = generateJti();
    const refreshExp = exp * 7;
    const refreshTokenPayload = {
      userId: id,
      exp: refreshExp,
      jti: refreshTokenJti,
    };
    const { REFRESH_TOKEN_SECRET } = c.env;
    const refreshToken = await generateRefreshToken(
      refreshTokenPayload,
      REFRESH_TOKEN_SECRET
    );
    const refreshTokenCreated = await prisma.refreshToken.create({
      data: { jti: refreshTokenJti, token: refreshToken, userId: id },
    });
    if (!refreshTokenCreated) {
      return c.json(
        { msg: "internal server error" },
        StatusCodes.internalServerError
      );
    }

    setCookie(c, "access_token", accessToken, accessTokenCookieOptions);
    setCookie(c, "refreshToken", refreshToken, refreshTokenCookieOptions);
    return c.json({ msg: "email verified successfully" }, 200);
  } catch (error) {
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});
userRouter.get("/protected", (c) => {
  return c.json({ msg: "hello hono" });
});
