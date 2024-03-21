import { MikroORM } from '@mikro-orm/mysql';
import { defaultEntities } from '@auth/mikro-orm-adapter';

import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } from '$env/static/private';

import { Chapter } from './models/chapter.model';
import { Course } from './models/course.model';
import { Lesson } from './models/lesson.model';
import { Prompt, PromptThread } from './models/prompt-history.model';
import { User } from './models/user.model';

export const orm = await MikroORM.init({
	entities: [
		Chapter,
		Course,
		Lesson,
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
	port: Number(DB_PORT)
});

export const em = orm.em;
console.log(orm.em); // access EntityManager via `em` property
