import z from "zod";

export const signupSchema = z.object({
  email: z.string().email("invalid email").max(320),
  username: z.string().max(128),
  password: z.string().max(128),
});
