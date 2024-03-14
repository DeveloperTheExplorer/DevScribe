import { relations } from 'drizzle-orm';
import { int, timestamp, mysqlTable, primaryKey, varchar, text } from 'drizzle-orm/mysql-core';
import type { AdapterAccount } from '@auth/core/adapters';

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
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date', fsp: 3 }).defaultNow(),
	image: varchar('image', { length: 255 }),
	skills: text('skills')
});

export const accounts = mysqlTable(
	'accounts',
	{
		userId: varchar('userId', { length: 36 })
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
		provider: varchar('provider', { length: 255 }).notNull(),
		providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
		refresh_token: varchar('refresh_token', { length: 255 }),
		access_token: varchar('access_token', { length: 255 }),
		expires_at: int('expires_at'),
		token_type: varchar('token_type', { length: 255 }),
		scope: varchar('scope', { length: 255 }),
		id_token: varchar('id_token', { length: 2048 }),
		session_state: varchar('session_state', { length: 255 })
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);

export const sessions = mysqlTable('sessions', {
	sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
	userId: varchar('userId', { length: 36 })
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = mysqlTable(
	'verification_tokens',
	{
		identifier: varchar('identifier', { length: 255 }).notNull(),
		token: varchar('token', { length: 255 }).notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
	})
);

export const userRelations = relations(users, ({ many }) => ({
	courses: many(courses)
}));

export type IUser = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
