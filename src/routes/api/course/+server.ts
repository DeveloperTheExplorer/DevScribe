import { z } from 'zod';
import { OpenAIStream, StreamingTextResponse } from "ai";
import type { Stream } from "openai/streaming";
import type { ChatCompletionChunk } from "openai/resources";

import { DevScribeAIPlanner, type PromptMessage } from "$lib/server/services/devscribe-ai.service";
import type { RequestHandler } from './$types';

const postSchema = z.object({
  prompt: z.string(),
  forceNew: z.boolean().optional(),
});

export const POST = (async ({ request }) => {
  const { messages } = await request.json();
  const devscribeAI = new DevScribeAIPlanner({ stream: true });
  // const promptMessage: PromptMessage = {
  //   role: "user",
  //   content: prompt as string,
  // }
  const response = await devscribeAI.prompt(messages as PromptMessage[]);
  const stream = OpenAIStream(response as Stream<ChatCompletionChunk>);
  
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler
// An app where you can see the weather live in your city.