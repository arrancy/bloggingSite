import z from "zod";
export const newVerificationTokenSchema = z.object({
  email: z.string().email().max(320),
});
