import { json, text } from '@sveltejs/kit';
import { z } from 'zod';
import { OpenAIStream, StreamingTextResponse, streamToResponse } from "ai";

import { DevScribeAIProjectPlanner, type PromptMessage } from "$lib/server/services/devscribe-ai.service";
import type { RequestHandler } from './$types';
import { CourseService } from '$lib/server/services/course.service';

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

  const prompt = messages[messages.length - 1].content;
  const courseByPrompt = await CourseService.getCourseByPrompt(prompt);

  if (courseByPrompt) {
    return json(JSON.parse(courseByPrompt.content));
  }

  const devscribeAI = new DevScribeAIProjectPlanner({ stream: true });
  const { stream } = await devscribeAI.prompt(messages as PromptMessage[], undefined, session.user.id);

  return new StreamingTextResponse(stream);
}) satisfies RequestHandler
