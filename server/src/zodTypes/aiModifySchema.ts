import z from "zod";
const tones = ["casual", "formal", "funny", "friendly"] as const;

export const aiModifySchema = z.object({
  snippet: z.string().min(50).max(1000),
  tone: z.enum(tones).optional(),
  instruction: z.string().min(6).max(50).optional(),
});
