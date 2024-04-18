import { MikroORM, ReflectMetadataProvider, type Options } from '@mikro-orm/mysql';
import { defaultEntities } from '@auth/mikro-orm-adapter';

import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } from '$env/static/private';

import { Chapter } from './models/chapter.model';
import { Course } from './models/course.model';
import { Lesson, LessonThread } from './models/lesson.model';
import { Prompt, PromptThread } from './models/prompt-history.model';
import { User } from './models/user.model';

export const config: Options = {
	metadataProvider: ReflectMetadataProvider,
	entities: [
		Chapter,
		Course,
		Lesson,
		LessonThread,
		Prompt,
		PromptThread,
		User,
		defaultEntities.Account,
		defaultEntities.Session,
		defaultEntities.VerificationToken
	],
	entitiesTs: ['./models'],
	dbName: 'devscribe',
	password: DB_PASSWORD,
	host: DB_HOST,
	user: DB_USERNAME,
	port: Number(DB_PORT),
	debug: true
};

export const orm = await MikroORM.init(config);

export const em = orm.em;
console.log(orm.em); // access EntityManager via `em` property
