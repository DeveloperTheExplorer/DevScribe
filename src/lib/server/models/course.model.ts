import { Entity, ManyToOne, PrimaryKey, Property, type Opt } from '@mikro-orm/core';

import { generateUUID } from '$lib/utils/hash.util';
import { Chapter } from './chapter.model';
import { users } from './user.model';
import { slugify } from '$lib/utils/string.util';

@Entity()
export class Course {
	@PrimaryKey({ type: 'uuid' })
	id = generateUUID();

	@Property()
	name!: string;

	@Property()
	slug!: string;

	@Property()
	description!: string;

	@Property()
	duration!: number;

	@Property()
	progress: number & Opt = 0;

	@Property()
	skills: string;

	@Property()
	difficulty: number;

	@Property()
	technologies: string;

	@Property()
	modelUsed: string;

	@Property()
	prompt: string;

	@Property()
	promptHash: string;

	@Property()
	contentHash: string;

	@Property()
	content: string;

	@ManyToOne(() => User)
	owner: User;

	constructor(course: NewCourse) {
		this.name = course.name;
		this.slug = slugify(course.name);
		this.description = course.description;
		this.duration = course.duration;
		this.progress = course.progress;
		this.skills = course.skills;
		this.difficulty = course.difficulty;
		this.technologies = course.technologies;
		this.modelUsed = course.modelUsed;
		this.prompt = course.prompt;
		this.promptHash = course.promptHash;
		this.contentHash = course.contentHash;
		this.content = course.content;
		this.owner = course.owner;
	}
}

export type ICourse = Course;
export type NewCourse = Omit<Course, 'id' | 'slug'>;

// export const courses = mysqlTable('courses', {
//   id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
//   name: varchar('name', { length: 128 }).notNull(),
//   slug: varchar('slug', { length: 128 }).unique().notNull(),
//   description: text('description'),
//   duration: int('duration').notNull(),
//   progress: int('progress').notNull().$default(() => 0),
//   skills: text('skills'),
//   difficulty: int('difficulty'),
//   technologies: text('technologies').notNull(),
//   modelUsed: varchar('model_used', { length: 128 }).notNull(),
//   prompt: text('prompt').notNull(),
//   promptHash: text('prompt_hash').notNull(),
//   contentHash: varchar('content_hash', { length: 64 }).notNull().unique(),
//   content: text('content'),
//   ownerId: varchar('owner_id', { length: 36 }).notNull().references(() => users.id),
// });

// export const courseRelations = relations(courses, ({ many, one }) => ({
//   chapters: many(chapters),
//   owner: one(users, {
//     fields: [courses.ownerId],
//     references: [users.id]
//   })
// }));

// export type ICourse = typeof courses.$inferSelect; // return type when queried
// export type NewCourse = Omit<typeof courses.$inferInsert, 'slug'> & {
//   slug?: string;
// };
