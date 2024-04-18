import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	type Opt,
	Collection,
	OneToMany
} from '@mikro-orm/core';

import { generateUUID } from '$lib/utils/hash.util';
import { Lesson } from './lesson.model';
import { Course } from './course.model';
import { BaseModel } from './base.model';

@Entity()
export class Chapter extends BaseModel {
	@Property()
	name!: string;

	@Property()
	description!: string;

	@Property()
	duration!: number;

	@Property()
	skills!: string;

	@Property()
	difficulty?: number;

	@Property()
	technologies!: string;

	@Property()
	modelUsed?: string;

	@Property()
	content?: string;

	@ManyToOne(() => Course)
	course!: Course;

	@OneToMany(() => Lesson, (lesson) => lesson.chapter)
	lessons = new Collection<Lesson>(this);

	constructor(chapter: NewChapter) {
		super();
		this.name = chapter.name;
		this.description = chapter.description;
		this.duration = chapter.duration;
		this.skills = chapter.skills;
		this.difficulty = chapter.difficulty;
		this.technologies = chapter.technologies;
		this.modelUsed = chapter.modelUsed;
		this.content = chapter.content;
	}
}

export type IChapter = Chapter;
export type NewChapter = Omit<Chapter, 'id'>;

// export const chapters = mysqlTable('chapters', {
// 	id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
// 	name: varchar('name', { length: 128 }),
// 	description: text('description'),
// 	duration: int('duration'),
// 	skills: text('skills'),
// 	difficulty: int('difficulty'),
// 	technologies: text('technologies'),
// 	modelUsed: varchar('model_used', { length: 128 }),
// 	content: text('content'),
// 	courseId: varchar('course_id', { length: 36 }).references(() => courses.id)
// });

// export const chapterRelations = relations(chapters, ({ one, many }) => ({
// 	lessons: many(lessons),
// 	course: one(courses, {
// 		fields: [chapters.courseId],
// 		references: [courses.id]
// 	})
// }));

// export type IChapter = typeof chapters.$inferSelect; // return type when queried
// export type NewChapter = typeof chapters.$inferInsert; // insert type
