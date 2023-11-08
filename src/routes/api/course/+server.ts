import { z } from 'zod';
import { OpenAIStream, StreamingTextResponse } from "ai";
import type { Stream } from "openai/streaming";
import type { ChatCompletionChunk } from "openai/resources";

import { DevScribeAIProjectPlanner, type PromptMessage } from "$lib/server/services/devscribe-ai.service";
import type { RequestHandler } from './$types';

const postSchema = z.object({
  prompt: z.string(),
  forceNew: z.boolean().optional(),
});

export const POST = (async ({ request }) => {
  let { messages, selectedTechs } = await request.json();
  messages = messages as PromptMessage[];
  messages[messages.length - 1].content += `;\n tech-stack: ${selectedTechs.join(", ")}`;

  const devscribeAI = new DevScribeAIProjectPlanner({ stream: true });
  const response = await devscribeAI.prompt(messages as PromptMessage[]);
  const stream = OpenAIStream(response as Stream<ChatCompletionChunk>);
  
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler
// An app where you can see the weather live in your city.