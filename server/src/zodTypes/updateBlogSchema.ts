import z from "zod";
export const updateBlogSchema = z.object({
  blogId: z.number(),
  title: z.string().min(1).max(255).optional(),
  content: z.string().min(1).max(2500).optional(),
  isDraft: z.boolean(),
});
