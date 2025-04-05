import z from "zod";
export const signinSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().max(128),
});
