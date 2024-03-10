import { relations } from 'drizzle-orm';
import { mysqlTable, text, varchar, int, mysqlEnum } from 'drizzle-orm/mysql-core';

import { generateUUID } from '$lib/utils/hash.util';
import { drizzleEnum } from "$lib/utils/type.utils";
import { chapters } from './chapter.model';

export enum LessonStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export const lessons = mysqlTable('lessons', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
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
  chapterId: varchar('chapter_id', { length: 36 }).references(() => chapters.id)
});


export const lessonRelations = relations(lessons, ({ one }) => ({
  chapter: one(chapters, {
    fields: [lessons.chapterId],
    references: [chapters.id]
  })
}));

export type ILesson = typeof lessons.$inferSelect; // return type when queried
export type NewLesson = typeof lessons.$inferInsert; // insert type