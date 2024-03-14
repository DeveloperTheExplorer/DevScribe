import { db } from '../db';

import { chapters, type NewChapter } from '../models/chapter.model';
import { courses, type ICourse, type NewCourse } from '../models/course.model';
import { lessons, type NewLesson } from '../models/lesson.model';

import { slugify } from '$lib/utils/string.util';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { hashValue } from '../utils/hash.util';

export type NewChapterWithLessons = NewChapter & { lessons: NewLesson[] };
export type CourseIdentifier<T extends keyof ICourse> = Pick<ICourse, T>;

class CourseRepository {
	async getById(courseId: string) {
		return await db.query.courses.findFirst({
			where: eq(courses.id, courseId),
			with: {
				chapters: {
					with: {
						lessons: true
					}
				}
			}
		});
	}

	async getByIdentifier<T extends keyof ICourse>(identifier: CourseIdentifier<T>) {
		const [key] = Object.keys(identifier) as [keyof ICourse];
		let [value] = Object.values(identifier) as [string | number];

		return await db.query.courses.findFirst({
			where: eq(courses[key], value),
			with: {
				chapters: {
					with: {
						lessons: true
					}
				}
			}
		});
	}

	async getByPrompt(prompt: string) {
		return await db.query.courses.findFirst({
			where: eq(courses.promptHash, hashValue(prompt)),
			with: {
				chapters: {
					with: {
						lessons: true
					}
				}
			}
		});
	}

	async getAllFromUserId(studentId: string) {
		return await db.query.courses.findMany({
			where: eq(courses.ownerId, studentId),
			with: {
				chapters: {
					with: {
						lessons: true
					}
				}
			},
			orderBy: desc(courses.progress)
		});
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
