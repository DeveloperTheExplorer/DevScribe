import { mysqlTable, mysqlSchema, AnyMySqlColumn, varchar, text, int, unique, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const chapters = mysqlTable("chapters", {
	id: varchar("id", { length: 36 }),
	name: varchar("name", { length: 128 }),
	description: text("description"),
	duration: int("duration"),
	skills: text("skills"),
	difficulty: int("difficulty"),
	technologies: text("technologies"),
	modelUsed: varchar("model_used", { length: 128 }),
	content: text("content"),
	courseId: varchar("course_id", { length: 36 }),
});

export const courses = mysqlTable("courses", {
	id: varchar("id", { length: 36 }),
	name: varchar("name", { length: 128 }).notNull(),
	slug: varchar("slug", { length: 128 }).notNull(),
	description: text("description"),
	duration: int("duration").notNull(),
	progress: int("progress").notNull(),
	skills: text("skills"),
	difficulty: int("difficulty"),
	technologies: text("technologies").notNull(),
	modelUsed: varchar("model_used", { length: 128 }).notNull(),
	prompt: text("prompt").notNull(),
	promptHash: text("prompt_hash").notNull(),
	contentHash: varchar("content_hash", { length: 64 }).notNull(),
	content: text("content"),
	ownerId: varchar("owner_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		coursesSlugUnique: unique("courses_slug_unique").on(table.slug),
		coursesContentHashUnique: unique("courses_content_hash_unique").on(table.contentHash),
	}
});

export const lessons = mysqlTable("lessons", {
	id: varchar("id", { length: 36 }),
	name: varchar("name", { length: 128 }),
	description: text("description"),
	duration: int("duration"),
	skills: text("skills"),
	difficulty: int("difficulty"),
	technologies: text("technologies"),
	status: mysqlEnum("status", ['NOT_STARTED','IN_PROGRESS','COMPLETED']),
	modelUsed: varchar("model_used", { length: 128 }),
	content: text("content"),
	prompt: text("prompt"),
	chapterId: varchar("chapter_id", { length: 36 }),
});

export const promptThreads = mysqlTable("prompt_threads", {
	id: varchar("id", { length: 36 }),
	model: varchar("model", { length: 128 }),
	hash: varchar("hash", { length: 128 }),
	tokensUsed: int("tokens_used"),
	approved: int("approved"),
	timestamp: int("timestamp"),
	userId: varchar("user_id", { length: 36 }),
});

export const prompts = mysqlTable("prompts", {
	id: varchar("id", { length: 36 }),
	role: mysqlEnum("role", ['system','user','assistant']),
	content: text("content"),
	threadId: varchar("thread_id", { length: 36 }),
});

export const users = mysqlTable("users", {
	id: varchar("id", { length: 36 }),
	name: varchar("name", { length: 128 }),
	email: varchar("email", { length: 128 }).notNull(),
	skills: text("skills"),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});