import { em } from '../db';

import { Chapter, type NewChapter } from '../models/chapter.model';
import { Course, type ICourse, type NewCourse } from '../models/course.model';
import { Lesson, LessonThread, type NewLesson, type NewLessonThread } from '../models/lesson.model';

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
		const newCourse = new Course({ ...course });
		em.persist(newCourse);

		for (const chapter of chaptersWithLessons) {
			const newChapter = new Chapter({ ...chapter, course: newCourse });
			em.persist(newChapter);

			for (const lessonIndex in chapter.lessons) {
				const newLesson = new Lesson({
					...chapter.lessons[+lessonIndex],
					lessonIndex: +lessonIndex,
					chapter: newChapter
				});
				em.persist(newLesson);
			}
		}
		await em.flush();

		return { id: newCourse.id, slug: newCourse.slug };
	}

	async addLessonThread(lesson: NewLessonThread, lessonId: string) {
		const lessonRef = await em.getReference(Lesson, lessonId);
		const newLessonThread = new LessonThread({ ...lesson, lesson: lessonRef });
		em.persist(newLessonThread);
		await em.flush();

		return newLessonThread;
	}

	async addLessonContent(
		lessonContent: string,
		prompt: string,
		modelUsed: string,
		lessonId: string
	) {
		const lessonRef = await em.getReference(Lesson, lessonId);
		lessonRef.content = lessonContent;
		lessonRef.prompt = prompt;
		lessonRef.modelUsed = modelUsed;

		await em.flush();
	}
}

const courseRepository = new CourseRepository();
export { courseRepository as CourseRepository };
