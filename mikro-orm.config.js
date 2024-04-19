import { defineConfig } from '@mikro-orm/mysql';
import { Migrator } from '@mikro-orm/migrations'; // or `@mikro-orm/migrations-mongodb`

// setup dotenv
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	// ...
	entities: ['./src/lib/server/models/*.model.ts'],
	entitiesTs: ['./src/lib/server/models/*.model.ts'],
	migrations: {
		path: './build/migrations', // path to the folder with migrations
		pathTs: './src/migrations', // path to the folder with migration files written in TypeScript
		emit: 'js'
	},
	dbName: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	port: Number(process.env.DB_PORT),
	extensions: [Migrator]
});
