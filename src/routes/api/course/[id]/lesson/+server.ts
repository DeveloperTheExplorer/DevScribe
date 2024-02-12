import { json, text } from '@sveltejs/kit';
import { z } from 'zod';
import { StreamingTextResponse } from "ai";

import { DevScribeAILessonGenerator, type PromptMessage } from "$lib/server/services/devscribe-ai.service";
import type { RequestHandler } from './$types';
import { CourseService } from '$lib/server/services/course.service';

const postSchema = z.object({
  lessonIndex: z.number().gte(0),
  chapterIndex: z.number().gte(0),
});

export const POST = (async ({ request, locals, params }) => {
  const session = await locals.getSession();
  const { id } = params;

  if (!id) {
    throw new Error("Not Found");
  }
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const course = await CourseService.getCourse(id);

  if (!course) {
    throw new Error("Not found");
  }

  const body = await request.json();
  const { lessonIndex, chapterIndex } = postSchema.parse(body);

  // messages[messages.length - 1].content += `;\n tech-stack: ${selectedTechs.join(", ")}`;

  const message: PromptMessage[] = [
    {
      role: "user",
      content: `Goal: `,
    }
  ];

  const devscribeAI = new DevScribeAILessonGenerator({ stream: true });
  const { stream } = await devscribeAI.prompt(message, {}, course.id, chapterIndex, lessonIndex);

  return new StreamingTextResponse(stream);
}) satisfies RequestHandler
