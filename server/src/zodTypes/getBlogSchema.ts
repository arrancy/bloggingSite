import z from "zod";
export const getBlogSchema = z.object({ userId: z.string().min(1) });
