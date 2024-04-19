import {
	MikroORM,
	ReflectMetadataProvider,
	type Options,
	type MySqlDriver
} from '@mikro-orm/mysql';

import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE } from '$env/static/private';

import { Chapter } from './models/chapter.model';
import { Course } from './models/course.model';
import { Lesson, LessonThread } from './models/lesson.model';
import { Prompt, PromptThread } from './models/prompt-history.model';
import { User, Account, Session, VerificationToken } from './models/user.model';

export const config: Options = {
	entities: [
		Chapter,
		Course,
		Lesson,
		LessonThread,
		Prompt,
		PromptThread,
		User,
		Account,
		Session,
		VerificationToken
	],
	entitiesTs: ['./models'],
	dbName: DB_DATABASE,
	password: DB_PASSWORD,
	host: DB_HOST,
	user: DB_USERNAME,
	port: Number(DB_PORT),
	metadataProvider: ReflectMetadataProvider,
	debug: true
};

export const orm = await MikroORM.init<MySqlDriver>(config);

export const em = orm.em;
console.log(orm.em); // access EntityManager via `em` property
