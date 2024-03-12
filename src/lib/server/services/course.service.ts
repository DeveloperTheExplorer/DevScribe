import { CourseRepository, type NewChapterWithLessons } from '../repositories/course.repository';

import { HashType, determineHashType, hashValue } from '$lib/utils/hash.util';
import { extractTechnologiesFromText } from '$lib/utils/technologies.util';
import { SkillCategory } from '$lib/types/skill-category.types';

import type { NewCourse } from '../models/course.model';
import type { RawCourse } from '../types';

class CourseService {
	async getCourse(courseId: string) {
		return await CourseRepository.getById(courseId);
	}

	async getCourseByPrompt(prompt: string) {
		return await CourseRepository.getByPrompt(prompt);
	}

	async getCoursesByUserId(studentId: string) {
		return await CourseRepository.getAllFromUserId(studentId);
	}

	async getCourseByUnknownIdentifier(identifier: string) {
		const hashType = determineHashType(identifier);

		if (hashType === HashType.UUID) {
			return await this.getCourse(identifier);
		}
		return await CourseRepository.getBySlug(identifier);
	}

	async create(course: string, prompt: string, modelUsed: string, userId: string) {
		const rawCourseObj = JSON.parse(course) as RawCourse;
		const courseObj: NewCourse = {
			ownerId: userId,
			name: rawCourseObj.intro.name,
			description: rawCourseObj.intro.description,
			duration: rawCourseObj.plan.reduce((acc, plan) => acc + plan.duration, 0),
			skills: SkillCategory.FULL_STACK,
			technologies: rawCourseObj.intro.techStack.join(','),
			modelUsed,
			prompt,
			promptHash: hashValue(prompt),
			contentHash: hashValue(course),
			content: course
		};
		const chapters: NewChapterWithLessons[] = rawCourseObj.plan.map((plan) => ({
			name: `${plan.title} | ${rawCourseObj.intro.name}`,
			duration: plan.duration,
			modelUsed,
			lessons: plan.plan.map((lesson) => ({
				name: lesson,
				technologies: extractTechnologiesFromText(lesson).join(','),
				prompt: lesson
			})),
			technologies: extractTechnologiesFromText(plan.plan.join('. ')).join(',')
		}));

		const newCourseIdentifier = CourseRepository.create(courseObj, chapters);

		return newCourseIdentifier;
	}

	async addLessonContent(
		lessonId: string,
		lessonContent: string,
		prompt: string,
		modelUsed: string
	) {
		return CourseRepository.addLessonContent(lessonContent, prompt, modelUsed, lessonId);
	}
}

const courseService = new CourseService();

export { courseService as CourseService };
