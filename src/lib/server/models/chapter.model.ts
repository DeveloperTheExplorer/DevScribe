
import { relations } from 'drizzle-orm';
import { mysqlTable, text, varchar, int } from 'drizzle-orm/mysql-core';

import { generateUUID } from '$lib/utils/hash.util';
import { lessons } from './lesson.model';
import { courses } from './course.model';

export const chapters = mysqlTable('chapters', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
  name: varchar('name', { length: 128 }),
  description: text('description'),
  duration: int('duration'),
  skills: text('skills'),
  difficulty: int('difficulty'),
  technologies: text('technologies'),
  modelUsed: varchar('model_used', { length: 128 }),
  content: text('content'),
  courseId: varchar('course_id', { length: 36 }).references(() => courses.id)
});

export const chapterRelations = relations(chapters, ({ one, many }) => ({
  lessons: many(lessons),
  course: one(courses, {
    fields: [chapters.courseId],
    references: [courses.id]
  })
}));

export type IChapter = typeof chapters.$inferSelect; // return type when queried
export type NewChapter = typeof chapters.$inferInsert; // insert type