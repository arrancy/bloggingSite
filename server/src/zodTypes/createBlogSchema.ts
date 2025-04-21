import z from "zod";
export const createBlogSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(2500),
  isDraft: z.boolean(),
});
