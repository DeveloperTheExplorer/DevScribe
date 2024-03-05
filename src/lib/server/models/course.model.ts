import { mysqlTable, serial, text, varchar, int } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';

import { db } from '../db';

import { generateUUID } from '$lib/utils/hash.util';
import { slugify } from '$lib/utils/string.util';

export const chapters = mysqlTable('chapters', {
  id: varchar('id', { length: 128 }).$defaultFn(generateUUID),
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
  contentHash: text('content_hash').notNull().unique(),
  content: text('content'),

});


// export type User = typeof users.$inferSelect; // return type when queried
// export type NewUser = typeof users.$inferInsert; // insert type


// const CourseSchema = new Schema({
//   student: { type: Schema.Types.ObjectId, required: true },
//   name: { type: String, required: true },
//   slug: { type: String, unique: true },
//   description: { type: String },
//   duration: { type: Number, required: true },
//   progress: { type: Number, default: 0 },
//   skills: [{ type: String }],
//   difficulty: { type: Number },
//   technologies: [{ type: String, required: true }],
//   chapters: [ChapterSchema],
//   modelUsed: { type: String, required: true },
//   prompt: { type: String, required: true },
//   promptHash: { type: String, required: true },
//   contentHash: { type: String, required: true, unique: true },
//   content: { type: String, required: true }
// }, (courses) => {
//   return {
//     nameIndex: courses.name
//   }
// });