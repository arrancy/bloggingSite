import z from "zod";
export const deleteBlogSchema = z.object({ blogId: z.string() });
