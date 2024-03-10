import { relations } from 'drizzle-orm';
import { mysqlTable, text, varchar, int } from 'drizzle-orm/mysql-core';

import { generateUUID } from '$lib/utils/hash.util';

import { SkillCategory } from '$lib/types/skill-category.types';
import { courses } from './course.model';
export interface ISkill {
  name: string;
  description?: string;
  category: SkillCategory;
  skillLevel?: number;
  tags?: string[];
}

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
  name: varchar('name', { length: 128 }),
  email: varchar('email', { length: 128 }).unique().notNull(),
  skills: text('skills')
});

export const userRelations = relations(users, ({ many }) => ({
  courses: many(courses)
}));

export type IUser = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type