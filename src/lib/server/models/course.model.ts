import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	type Opt,
	OneToMany,
	Collection
} from '@mikro-orm/core';

import { generateUUID } from '$lib/utils/hash.util';
import { Chapter } from './chapter.model';
import { User } from './user.model';
import { slugify } from '$lib/utils/string.util';
import { BaseModel } from './base.model';

@Entity()
export class Course extends BaseModel {
	@Property()
	name!: string;

	@Property()
	slug!: string;

	@Property()
	description!: string;

	@Property()
	duration!: number;

	@Property()
	progress?: number & Opt = 0;

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
	owner: typeof User;

	@OneToMany(() => Chapter, (chapter) => chapter.course)
	chapters = new Collection<Chapter>(this);

	constructor(course: NewCourse) {
		super();
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
		this.chapters = course.chapters;
	}
}

export type ICourse = Course;
export type NewCourse = Omit<Course, 'id' | 'slug'>;
