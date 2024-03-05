import { mysqlTable, serial, text, varchar, int } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';

import { db } from '../db';

import { generateUUID } from '$lib/utils/hash.util';

export const chapters = mysqlTable('chapters', {
  id: varchar('id', { length: 128 }).$defaultFn(generateUUID),
  name: varchar('name', { length: 128 }),
  description: text('description'),
  duration: int('duration'),
  skills: text('skills'),
  difficulty: int('difficulty'),
  technologies: text('technologies'),
  modelUsed: varchar('model_used', { length: 128 }),
  content: text('content'),
});
// export type User = typeof users.$inferSelect; // return type when queried
// export type NewUser = typeof users.$inferInsert; // insert type

// export interface IChapter {
//   id: string; // uuid
//   name: string;
//   description?: string;
//   duration: number;
//   skills?: SkillCategory[];
//   difficulty?: number;
//   technologies: string[];
//   modelUsed: string;
//   content?: string;
//   lessons: ILesson[];
// }