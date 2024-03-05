import { mysqlTable, serial, text, varchar, int, mysqlEnum } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';

import { db } from '../db';

import { generateUUID } from '$lib/utils/hash.util';
import { drizzleEnum } from "$lib/utils/type.utils";

export enum LessonStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export const lessons = mysqlTable('lessons', {
  id: varchar('id', { length: 128 }).$defaultFn(generateUUID),
  name: varchar('name', { length: 128 }),
  description: text('description'),
  duration: int('duration'),
  skills: text('skills'),
  difficulty: int('difficulty'),
  technologies: text('technologies'),
  status: mysqlEnum('status', drizzleEnum(LessonStatus)),
  modelUsed: varchar('model_used', { length: 128 }),
  content: text('content'),
  prompt: text('prompt'),
});

// export interface ILesson {
//   _id?: Types.ObjectId | string;
//   name: string;
//   description?: string;
//   duration?: number;
//   skills?: SkillCategory[];
//   difficulty?: number;
//   technologies: string[];
//   status?: LessonStatus;
//   modelUsed?: string;
//   content?: string;
//   prompt: string;
// }