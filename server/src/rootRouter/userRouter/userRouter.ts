import { Hono } from "hono";
import { signupSchema } from "../../zodTypes/signupSchema";
import { prismaMiddleware } from "../../prismaMiddleware/prismaMiddleware";
import { Bindings } from "../..";
import { Variables } from "../..";
import z from "zod";
import bcrypt from "bcrypt-edge";
import { Resend } from "resend";
import { deleteCookie, setCookie } from "hono/cookie";
import { accessTokenCookieOptions } from "../../auth/cookieOptions/accessTokenCookieOptions";
import { refreshTokenCookieOptions } from "../../auth/cookieOptions/refreshTokenCookieOptions";
import { StatusCodes } from "../../enums/enums";
import { newVerificationTokenSchema } from "../../zodTypes/newVerificationTokenSchema";
import { verify } from "hono/jwt";
import { RefreshTokenPayload } from "../../auth/authTypes/RefreshTokenPayload";
import { generateAccessAndRefreshToken } from "../../auth/authUtils/generateAccessAndRefreshToken";
import { signinSchema } from "../../zodTypes/signinSchema";
import { authMiddleware } from "../../auth/authMiddleWare";
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
userRouter.get("/newVerificationToken/:email", async (c) => {
  try {
    type ReqBody = z.infer<typeof newVerificationTokenSchema>;
    const reqBody: ReqBody = c.req.param();
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
      // this case is generally not possible, but even if it happens, we need to issue a new verification token for the user
      const newVerificationToken = generateVerificationToken();
      const tommorowTime = new Date();
      tommorowTime.setDate(tommorowTime.getDate() + 1);
      const createNewVerificationToken = await prisma.verification_token.create(
        {
          data: {
            token: newVerificationToken,
            userId: id,
            expiresAt: tommorowTime.toISOString(),
          },
        }
      );
      if (!createNewVerificationToken) {
        return c.json(
          { msg: "internal server error" },
          StatusCodes.internalServerError
        );
      }
      const { token } = createNewVerificationToken;
      const newVerificationTokenUrl = `http://localhost:8787/api/v1/user/verify?verificationToken?=${token}`;
      const resend = new Resend(c.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: "no-reply@verify.writeintelligent.blog",
        to: email,
        subject: "verify your email",
        html: `<p>to verify your email for writeintelligent.blog, click <a href=${newVerificationTokenUrl}>here</a></p>`,
      });
      if (error) {
        return c.json({ msg: "error sending email : " + error.name }, 400);
      }
      return c.json({ msg: "email sent successfully" }, 200);
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
    const newToken = newVerificationTokenCreated.token;
    const newVerificationUrl = `http://localhost:8787/api/v1/user/verify?verificationToken=${newToken}`;
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
  } catch (error) {
    console.log(error);
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
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

    if (!userExists) {
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
    const { REFRESH_TOKEN_SECRET } = c.env;
    const { accessToken, refreshToken, jti } =
      await generateAccessAndRefreshToken(
        id,
        username,
        ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET
      );
    const refreshTokenCreated = await prisma.refreshToken.create({
      data: { jti, token: refreshToken, userId: id },
    });
    console.log(refreshTokenCreated);
    if (!refreshTokenCreated) {
      return c.json(
        { msg: "internal server error" },
        StatusCodes.internalServerError
      );
    }

    setCookie(c, "access_token", accessToken, accessTokenCookieOptions);
    setCookie(c, "refresh_Token", refreshToken, refreshTokenCookieOptions);
    return c.json({ msg: "email verified successfully" }, 200);
  } catch (error) {
    return c.json(
      { msg: "internal server error" },
      StatusCodes.internalServerError
    );
  }
});
userRouter.post("/signin", async (c) => {
  type ReqBody = z.infer<typeof signinSchema>;
  const reqBody: ReqBody = await c.req.json();
  const { success } = signinSchema.safeParse(reqBody);
  if (!success) {
    return c.json({ msg: "invalid inputs" }, StatusCodes.invalidInputs);
  }
  const { email } = reqBody;
  const { prisma } = c.var;
  const userExists = await prisma.user.findFirst({ where: { email } });
  if (!(userExists && userExists.verified)) {
    return c.json(
      { msg: "invalid credentials or email not verified " },
      StatusCodes.unauthenticad
    );
  }
  const { id, username } = userExists;
  // now the logic to check from how many devices is this person logged in from
  const refreshTokens = await prisma.refreshToken.findMany({
    where: { userId: id },
  });
  const numberOfRefreshtokens = refreshTokens.length;
  console.log(numberOfRefreshtokens);
  if (numberOfRefreshtokens <= 2) {
    const correctPassword = bcrypt.compareSync(
      reqBody.password,
      userExists.password
    );
    if (!correctPassword) {
      return c.json({ msg: "invalid credentials" }, StatusCodes.unauthenticad);
    }
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = c.env;
    const { accessToken, refreshToken, jti } =
      await generateAccessAndRefreshToken(
        id,
        username,
        ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET
      );
    setCookie(c, "access_token", accessToken, accessTokenCookieOptions);
    setCookie(c, "refresh_token", refreshToken, refreshTokenCookieOptions);
    return c.json({ msg: "logged in successfully" }, 200);
  } else {
    return c.json({ msg: "device login limit reached " }, StatusCodes.conflict);
  }
});
userRouter.get("/refreshToken", async (c) => {
  try {
    const receivedToken = c.req.header("Authorization");
    const { prisma } = c.var;
    if (!receivedToken) {
      return c.json(
        { msg: "please send valid credentials" },
        StatusCodes.unauthenticad
      );
    }
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = c.env;
    const decodedPayload = await verify(receivedToken, REFRESH_TOKEN_SECRET);
    const decoded = decodedPayload as RefreshTokenPayload;
    const { userId } = decoded;
    const oldJti = decoded.jti;
    const userExists = await prisma.user.findFirst({ where: { id: userId } });
    if (!userExists) {
      return c.json({ msg: "invalid credentials" }, StatusCodes.unauthenticad);
    }
    const { username } = userExists;
    const refreshTokenFound = await prisma.refreshToken.findFirst({
      where: { jti: oldJti, userId, token: receivedToken },
    });
    if (!refreshTokenFound) {
      return c.json({ msg: "invalid credentials" }, StatusCodes.unauthenticad);
    }

    const { accessToken, refreshToken, jti } =
      await generateAccessAndRefreshToken(
        userId,
        username,
        ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET
      );
    const refreshTokenInDb = await prisma.refreshToken.create({
      data: { token: refreshToken, jti, userId },
    });
    setCookie(c, "access_token", accessToken, accessTokenCookieOptions);
    setCookie(c, "refresh_token", refreshToken, refreshTokenCookieOptions);
    return c.json({ msg: "tokens refreshed successfully" }, 200);
  } catch (error) {
    console.log(error);
    return c.json(
      { msg: "internal server error " },
      StatusCodes.internalServerError
    );
  }
});

userRouter.get("/logout", authMiddleware, (c) => {
  deleteCookie(c, "access_token");
  deleteCookie(c, "refresh_token");
  return c.json({ msg: "logged out successfully" }, 200);
});
