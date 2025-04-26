import z from "zod";
export const aiModifySchema = z.object({
  snippet: z.string().min(50).max(1000),
  tone: z.string().optional(),
  customPrompt: z.string().optional(),
});
