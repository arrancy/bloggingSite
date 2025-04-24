import { createMiddleware } from "hono/factory";
import { Bindings, Variables } from "..";
import { GoogleGenAI } from "@google/genai";

export const aiMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  const ai = new GoogleGenAI({ apiKey: c.env.GEMINI_API_KEY });
  c.set("ai", ai);
  await next();
});
