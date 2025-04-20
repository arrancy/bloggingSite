import z from "zod";
export const getBlogSchema = z.object({ blogId: z.string().min(1).max(3) });
