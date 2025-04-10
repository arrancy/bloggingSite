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
import { authMiddleware } from "../../auth/authMiddleWare";
import { StatusCodes } from "../../enums/enums";
import { newVerificationTokenSchema } from "../../zodTypes/newVerificationTokenSchema";
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
    const { email, username } = reqBody;
    const { prisma } = c.var;
    const userExists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (userExists) {
      return c.json(
        { msg: "user already exists, email or username already taken" },
        StatusCodes.conflict
      );
    }
    const verificationToken = generateVerificationToken();
    const tommorowTime = new Date();
    tommorowTime.setDate(tommorowTime.getDate() + 1);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(reqBody.password, salt);

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
      console.log("we are here");
      return c.json(
        { msg: "internal server error" },
        StatusCodes.internalServerError
      );
    }
    const verificationUrl = `http://localhost:8787/api/v1/user/verify?verificationToken=${verificationToken}`;

    //logic to redirect the user to frontend page where it says to check email to verify it
    //signin will check if the person is verified or not, only then a token will be issued

    const resend = new Resend(c.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "no-reply@verify.writeintelligent.blog",
      to: email,
      subject: "verify your email",
      html: `<p>to verify your email for writeintelligent.blog, click <a href=${verificationUrl}>here</a></p>`,
    });
    console.log(data);
    if (error) {
      return c.json(
        { msg: "could not send verification email : " + error.message },
        StatusCodes.internalServerError
      );
    }
    return c.redirect("http://google.com");
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
userRouter.get("/newVerificationToken", async (c) => {
  type ReqBody = z.infer<typeof newVerificationTokenSchema>;
  const reqBody: ReqBody = await c.req.json();
  const { success } = newVerificationTokenSchema.safeParse(reqBody);
  if (!success) {
    return c.json({ msg: "invalid email" }, StatusCodes.invalidInputs);
  }
  const { email } = reqBody;

  const { prisma } = c.var;
  const userExists = await prisma.user.findFirst({ where: { email } });
  if (!userExists) {
    return c.json({ msg: "please sign up" }, StatusCodes.notFound);
  }
  const { verified, id } = userExists;
  if (verified) {
    return c.json({ msg: "email is already verified" }, StatusCodes.conflict);
  }
  const expiredToken = await prisma.verification_token.findFirst({
    where: { userId: id },
  });
  if (!expiredToken) {
    return;
  }
  const { expiresAt, token } = expiredToken;
  const currentTime = new Date().getTime();
  const expiryDate = new Date(expiresAt).getTime();
  const fifteenMinutes = -1 * (1000 * 60 * 15);
  const resend = new Resend(c.env.RESEND_API_KEY);

  if (currentTime - expiryDate <= fifteenMinutes) {
    const verificationUrl = `http://localhost:8787/api/v1/user/verify?verificationToken=${token}`;
    const { data, error } = await resend.emails.send({
      from: "no-reply@verify.writeintelligent.blog",
      to: email,
      subject: "verify your email",
      html: `<p>to verify your email for writeintelligent.blog, click <a href=${verificationUrl}>here</a></p>`,
    });
    if (error) {
      return c.json(
        {
          msg: "error sending verification email : " + error.name,
        },
        400
      );
    }
    return c.json({
      msg: "verification email has been sent, check your email",
    });
  }
  // if we have reached here this means either the email has expired or is 15 minutes away from expiry, so effectively expired
  const newVerificationToken = generateVerificationToken();
  const tommorowTime = new Date();
  tommorowTime.setDate(tommorowTime.getDate() + 1);
  const deleteVerificationToken = await prisma.verification_token.delete({
    where: { userId: id },
  });
  if (!deleteVerificationToken) {
    return c.json(
      { msg: "internal server error , please try again" },
      StatusCodes.internalServerError
    );
  }
  const newVerificationTokenCreated = await prisma.verification_token.create({
    data: {
      token: newVerificationToken,
      expiresAt: tommorowTime.toISOString(),
      userId: userExists.id,
    },
  });
  if (!newVerificationTokenCreated) {
    return c.json(
      { msg: "could not create new verification token" },
      StatusCodes.internalServerError
    );
  }
  const newVerificationUrl = `http://localhost:8787/api/v1/user/verify?verificationToken=${newVerificationTokenCreated}`;
  const { data, error } = await resend.emails.send({
    from: "no-reply@verify.writeintelligent.blog",
    to: email,
    subject: "verify your email",
    html: `<p>to verify your email for writeintelligent.blog, click <a href=${newVerificationUrl}>here</a></p>`,
  });
  if (error) {
    return c.json({ msg: "error sending email : " + error.name }, 400);
  }
  return c.redirect("http://google.com");
});
userRouter.get("/verify", async (c) => {
  console.log("reached request");
  try {
    const verification_token = c.req.query("verificationToken");
    if (!verification_token) {
      return c.json({ msg: "bad request" }, StatusCodes.invalidInputs);
    }
    const { prisma } = c.var;
    console.log("reached here 2");
    const userExists = await prisma.user.findFirst({
      where: { verification_token: { token: verification_token } },
    });
    console.log("reached here 3");

    if (!userExists) {
      console.log("reached here 4");

      return c.json(
        { msg: "invalid verification token" },
        StatusCodes.unauthenticad
      );
    }
    const verificationTokenValid = await prisma.verification_token.findFirst({
      where: { token: verification_token },
    });
    if (!verificationTokenValid) {
      return c.json(
        { msg: "invalid verification token" },
        StatusCodes.invalidInputs
      );
    }
    const expiryDate = verificationTokenValid.expiresAt;
    const expiryDateMilliseconds = new Date(expiryDate).getTime();
    const currentDateMilliseconds = new Date().getTime();
    const dateDifference = currentDateMilliseconds - expiryDateMilliseconds; //in js date objects can be subracted directly but TS was complaining so i had to convert them to millisecond numbers using getTime() method
    if (dateDifference >= 0) {
      return c.json(
        { msg: "verification token expired" },
        StatusCodes.unauthenticad
      );
    }

    const { id, username } = userExists;
    console.log(userExists);
    const verifyUser = await prisma.user.update({
      where: { id },
      data: { verified: true },
    });
    console.log("reached here 5");
    console.log(verifyUser);
    if (!verifyUser) {
      console.log("cant check verified true");
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
    console.log(accessToken + ",," + refreshToken);
    const refreshTokenCreated = await prisma.refreshToken.create({
      data: { jti: refreshTokenJti, token: refreshToken, userId: id },
    });
    console.log(refreshTokenCreated);
    if (!refreshTokenCreated) {
      console.log("reached here 6");
      return c.json(
        { msg: "internal server error" },
        StatusCodes.internalServerError
      );
    }

    setCookie(c, "access_token", accessToken, accessTokenCookieOptions);
    setCookie(c, "refreshToken", refreshToken, refreshTokenCookieOptions);
    return c.json({ msg: "email verified successfully" }, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});
userRouter.get("/protected", authMiddleware, (c) => {
  return c.json({ msg: "hello hono" });
});
