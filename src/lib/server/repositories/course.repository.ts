import { em } from '../db';

import { Chapter, type NewChapter } from '../models/chapter.model';
import { Course, type ICourse, type NewCourse } from '../models/course.model';
import { Lesson, type NewLesson } from '../models/lesson.model';

import { slugify } from '$lib/utils/string.util';
import { hashValue } from '../utils/hash.util';

export type NewChapterWithLessons = NewChapter & { lessons: NewLesson[] };
export type CourseIdentifier<T extends keyof ICourse> = Pick<ICourse, T>;

class CourseRepository {
	async getById(courseId: string) {
		const qb = em.createQueryBuilder(Course, 'course');

		return await qb
			.select('*')
			.where({ 'course.id': courseId })
			.leftJoinAndSelect('course.chapters', 'chapters')
			.leftJoinAndSelect('chapters.lessons', 'lessons');
	}

	async getByIdentifier<T extends keyof ICourse>(identifier: CourseIdentifier<T>) {
		const qb = em.createQueryBuilder(Course, 'course');
		const [key] = Object.keys(identifier) as [keyof ICourse];
		let [value] = Object.values(identifier) as [string | number];

		return await qb
			.select('*')
			.where({ [`course.${key}`]: value })
			.leftJoinAndSelect('course.chapters', 'chapters')
			.leftJoinAndSelect('chapters.lessons', 'lessons');
	}

	async getByPrompt(prompt: string) {
		const qb = em.createQueryBuilder(Course, 'course');
		return await qb
			.select('*')
			.where({ prompt: prompt })
			.leftJoinAndSelect('course.chapters', 'chapters')
			.leftJoinAndSelect('chapters.lessons', 'lessons');
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
