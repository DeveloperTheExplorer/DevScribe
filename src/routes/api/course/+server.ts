import { z } from 'zod';
import { OpenAIStream, StreamingTextResponse } from "ai";

import { DevScribeAIProjectPlanner, type PromptMessage } from "$lib/server/services/devscribe-ai.service";
import type { RequestHandler } from './$types';

const postSchema = z.object({
  prompt: z.string(),
  forceNew: z.boolean().optional(),
});

export const POST = (async ({ request, locals }) => {
  const session = await locals.getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  let { messages, selectedTechs } = await request.json();
  messages = messages as PromptMessage[];
  messages[messages.length - 1].content += `;\n tech-stack: ${selectedTechs.join(", ")}`;

  console.log('session :>> ', session);
  const devscribeAI = new DevScribeAIProjectPlanner({ stream: true });
  const { stream } = await devscribeAI.prompt(messages as PromptMessage[], undefined, selectedTechs, session.user.id);

  return new StreamingTextResponse(stream);
}) satisfies RequestHandler
// An app where you can see the weather live in your city.