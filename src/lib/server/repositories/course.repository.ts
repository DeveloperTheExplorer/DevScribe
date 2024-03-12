import { db } from '../db';

import { chapters, type NewChapter } from '../models/chapter.model';
import { courses, type NewCourse } from '../models/course.model';
import { lessons, type NewLesson } from '../models/lesson.model';

import { slugify } from '$lib/utils/string.util';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { hashValue } from '../utils/hash.util';

export type NewChapterWithLessons = NewChapter & { lessons: NewLesson[] };

class CourseRepository {
	async getById(courseId: string) {
		return db
			.select()
			.from(courses)
			.leftJoin(chapters, eq(courses.id, chapters.courseId))
			.leftJoin(lessons, eq(chapters.id, lessons.chapterId))
			.where(eq(courses.id, courseId))
			.all();
	}

	async getBySlug(slug: string) {
		return await db
			.select()
			.from(courses)
			.where(eq(courses.slug, slug))
			.then((res) => res[0]);
	}

	async getByPrompt(prompt: string) {
		return await db
			.select()
			.from(courses)
			.where(eq(courses.promptHash, hashValue(prompt)))
			.then((res) => res[0]);
	}

	async getAllFromUserId(studentId: string) {
		return await db
			.select()
			.from(courses)
			.where(eq(courses.ownerId, studentId))
			.orderBy(desc(courses.progress));
	}

	async create(course: NewCourse, chaptersWithLessons: NewChapterWithLessons[]) {
		const slug = slugify(course.name);
		const newCourse = await db.insert(courses).values({ ...course, slug });

		for (const chapter of chaptersWithLessons) {
			const newChapter = await db
				.insert(chapters)
				.values({ ...chapter, courseId: newCourse.insertId });
			for (const lessonIndex in chapter.lessons) {
				await db.insert(lessons).values({
					...chapter.lessons[+lessonIndex],
					lessonIndex: +lessonIndex,
					chapterId: newChapter.insertId
				});
			}
		}

		return { id: newCourse.insertId, slug };
	}

	async addLesson(lesson: NewLesson, chapterId: string, betweenIndexes: [number, number]) {
		const lessonIndex = betweenIndexes[0] + Math.round((betweenIndexes[1] - betweenIndexes[0]) / 2);
		return await db.insert(lessons).values({ ...lesson, lessonIndex, chapterId });
	}

	async addLessonContent(
		lessonContent: string,
		prompt: string,
		modelUsed: string,
		lessonId: string
	) {
		const lesson = await db
			.update(lessons)
			.set({ content: lessonContent, prompt, modelUsed })
			.where(and(eq(lessons.id, lessonId), isNull(lessons.content)));

		return lesson.rowsAffected;
	}
}

const courseRepository = new CourseRepository();
export { courseRepository as CourseRepository };
