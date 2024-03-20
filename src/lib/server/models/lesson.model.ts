import { Entity, ManyToOne, PrimaryKey, Property, type Opt } from '@mikro-orm/core';

import { generateUUID } from '$lib/utils/hash.util';
import { Chapter } from './chapter.model';

import { slugify } from '$lib/utils/string.util';

@Entity()
export class Lesson {
	@PrimaryKey({ type: 'uuid' })
	id = generateUUID();

	@Property()
	name!: string;

	@Property()
	description!: string;

	@Property()
	duration?: number;

	@Property()
	skills?: string;

	@Property()
	difficulty?: number;

	@Property()
	technologies?: string;

	@Property()
	modelUsed?: string;

	@Property()
	content?: string;

	@Property()
	prompt?: string;

	@Property()
	lessonIndex?: number;

	@ManyToOne(() => Chapter)
	chapter!: Chapter;

	constructor(lesson: NewLesson) {
		this.name = lesson.name;
		this.description = lesson.description;
		this.duration = lesson.duration;
		this.skills = lesson.skills;
		this.difficulty = lesson.difficulty;
		this.technologies = lesson.technologies;
		this.modelUsed = lesson.modelUsed;
		this.content = lesson.content;
		this.prompt = lesson.prompt;
		this.lessonIndex = lesson.lessonIndex;
	}
}

export type ILesson = Lesson;
export type NewLesson = Omit<Lesson, 'id' | 'lessonIndex'> & {
	lessonIndex?: number;
};

// export enum LessonStatus {
// 	NOT_STARTED = 'NOT_STARTED',
// 	IN_PROGRESS = 'IN_PROGRESS',
// 	COMPLETED = 'COMPLETED'
// }

// export const lessons = mysqlTable(
// 	'lessons',
// 	{
// 		id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
// 		name: varchar('name', { length: 128 }),
// 		description: text('description'),
// 		duration: int('duration'),
// 		skills: text('skills'),
// 		difficulty: int('difficulty'),
// 		technologies: text('technologies'),
// 		status: mysqlEnum('status', drizzleEnum(LessonStatus)),
// 		modelUsed: varchar('model_used', { length: 128 }),
// 		content: text('content'),
// 		prompt: text('prompt'),
// 		lessonIndex: float('lesson_index').notNull(),
// 		chapterId: varchar('chapter_id', { length: 36 }).references(() => chapters.id)
// 	},
// 	(lesson) => ({
// 		chapterLessonIndex: unique().on(lesson.chapterId, lesson.lessonIndex)
// 	})
// );

// export const lessonRelations = relations(lessons, ({ one }) => ({
// 	chapter: one(chapters, {
// 		fields: [lessons.chapterId],
// 		references: [chapters.id]
// 	})
// }));

// export type ILesson = typeof lessons.$inferSelect; // return type when queried
// export type NewLesson = Omit<typeof lessons.$inferInsert, 'lessonIndex'> & {
// 	lessonIndex?: number;
// };
