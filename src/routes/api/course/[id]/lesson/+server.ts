import { json, error } from '@sveltejs/kit';
import { z } from 'zod';
import { StreamingTextResponse } from 'ai';

import {
	DevScribeAILessonGenerator,
	type PromptMessage
} from '$lib/server/services/devscribe-ai.service';
import type { RequestHandler } from './$types';
import { CourseService } from '$lib/server/services/course.service';

const postSchema = z.object({
	lessonIndex: z.number().gte(0),
	chapterIndex: z.number().gte(0)
});

export const POST = (async ({ request, locals, params }) => {
	const session = await locals.getSession();
	const { id } = params;

	if (!id) {
		return error(400, 'id not provided');
	}
	if (!session?.user) {
		return error(401, 'Unauthorized');
	}

	const course = await CourseService.getCourse(id);

	if (!course) {
		throw error(404, 'Not found');
	}

	const body = await request.json();
	const lessonIndexesData = postSchema.safeParse(body);

	if (!lessonIndexesData.success) {
		return error(400, lessonIndexesData.error);
	}

	const { lessonIndex, chapterIndex } = lessonIndexesData.data;
	const lesson = course.chapters[chapterIndex].lessons[lessonIndex];

	if (lesson?.content && lesson?.content !== '') {
		return json(JSON.parse(lesson.content));
	}

	// messages[messages.length - 1].content += `;\n tech-stack: ${selectedTechs.join(", ")}`;

	const message: PromptMessage[] = [
		{
			role: 'user',
			content: `Goal: ${course.prompt} \nArticle Topic: ${lesson.name.split(';\n tech-stack: ')[0]}`
		}
	];

	const devscribeAI = new DevScribeAILessonGenerator({ stream: true });
	const { stream } = await devscribeAI.prompt(message, {}, course.id, chapterIndex, lessonIndex);

	return new StreamingTextResponse(stream);
}) satisfies RequestHandler;
