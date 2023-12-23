import { openaiClient } from "@wba/openai";
import OpenAI from "openai";
import ChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;

type ChatSystemSession = {
  role: "system";
  result: string;
};

type ChatAssistantSession = {
  role: "assistant";
  result: string;
};

type ChatUserSession = {
  role: "user";
  prompt: string;
  result: string;
};

type ChatSession = ChatAssistantSession | ChatSystemSession | ChatUserSession;

export class ChatPromptBuilder {
  private session: ChatSession[] = [];

  buildSessionPrompt(): ChatCompletionMessageParam[] {
    return this.session.flatMap((session) => {
      if (session.role === "user") {
        return [
          {
            role: "user",
            content: session.prompt,
          },
          {
            role: "assistant",
            content: session.result,
          },
        ] as ChatCompletionMessageParam[];
      }
      return [
        {
          role: "system",
          content: session.result,
        },
      ];
    });
  }

  async prompt(
    message: string,
    role: "user" | "assistant" | "system" = "user",
  ) {
    const response = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      n: 1,
      temperature: 0.2,
      messages: [
        ...this.buildSessionPrompt(),
        {
          role,
          content: message,
        },
      ],
    });
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in response", { cause: { message } });
    }
    this.session.push({
      prompt: message,
      result: response.choices[0].message.content ?? "Sorry I can't help you",
      role,
    });
    return content;
  }

  addContext(context: string) {
    this.session.push({
      result: context,
      role: "system",
    });
  }
}
