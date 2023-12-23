import { OpenAI } from "openai";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string;
    }
  }
}

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
