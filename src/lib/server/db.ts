import { MikroORM } from '@mikro-orm/mysql';

const orm = await MikroORM.init({
	entitiesTs: ['./models'],
	dbName: 'devscribe'
});
console.log(orm.em); // access EntityManager via `em` property

// import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } from '$env/static/private';

// import { drizzle } from 'drizzle-orm/planetscale-serverless';
// import { Client } from '@planetscale/database';

// import * as chapterSchema from './models/chapter.model';
// import * as courseSchema from './models/course.model';
// import * as lessonSchema from './models/lesson.model';
// import * as promptSchema from './models/prompt-history.model';
// import * as userSchema from './models/user.model';

// const client = new Client({
// 	host: DB_HOST,
// 	username: DB_USERNAME,
// 	password: DB_PASSWORD,
// 	url: `https://${DB_HOST}:${DB_PORT}`
// });

// export const db = drizzle(client, {
// 	schema: {
// 		...chapterSchema,
// 		...courseSchema,
// 		...lessonSchema,
// 		...promptSchema,
// 		...userSchema
// 	}
// });
