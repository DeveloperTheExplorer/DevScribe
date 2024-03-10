import { relations } from 'drizzle-orm';
import { mysqlTable, text, varchar, int } from 'drizzle-orm/mysql-core';

import { generateUUID } from '$lib/utils/hash.util';
import { chapters } from './chapter.model';
import { users } from './user.model';

export const courses = mysqlTable('courses', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
  name: varchar('name', { length: 128 }).notNull(),
  slug: varchar('slug', { length: 128 }).unique().notNull(),
  description: text('description'),
  duration: int('duration').notNull(),
  progress: int('progress').notNull().$default(() => 0),
  skills: text('skills'),
  difficulty: int('difficulty'),
  technologies: text('technologies').notNull(),
  modelUsed: varchar('model_used', { length: 128 }).notNull(),
  prompt: text('prompt').notNull(),
  promptHash: text('prompt_hash').notNull(),
  contentHash: varchar('content_hash', { length: 64 }).notNull().unique(),
  content: text('content'),
  ownerId: varchar('owner_id', { length: 36 }).notNull().references(() => users.id),
});

export const courseRelations = relations(courses, ({ many, one }) => ({
  chapters: many(chapters),
  owner: one(users, {
    fields: [courses.ownerId],
    references: [users.id]
  })
}));

export type ICourse = typeof courses.$inferSelect; // return type when queried
export type NewCourse = typeof courses.$inferInsert; // insert type
