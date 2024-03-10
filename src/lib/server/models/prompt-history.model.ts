import { relations } from 'drizzle-orm';
import { mysqlTable, text, varchar, int, mysqlEnum } from 'drizzle-orm/mysql-core';

import { generateUUID } from '$lib/utils/hash.util';
import { users } from './user.model';
import { drizzleEnum } from '$lib/utils/type.utils';

export enum PrompotRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface IPrompt {
  role: PrompotRole;
  content: string;
}

export const prompts = mysqlTable('prompts', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
  role: mysqlEnum('role', drizzleEnum(PrompotRole)),
  content: text('content'),
  threadId: varchar('thread_id', { length: 36 }).references(() => promptThreads.id)
});

export const promptRelations = relations(prompts, ({ one }) => ({
  thread: one(promptThreads, {
    fields: [prompts.threadId],
    references: [promptThreads.id]
  })
}));

export const promptThreads = mysqlTable('prompt_threads', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
  model: varchar('model', { length: 128 }),
  hash: varchar('hash', { length: 128 }),
  tokensUsed: int('tokens_used'),
  approved: int('approved'),
  timestamp: int('timestamp'),
  userId: varchar('user_id', { length: 36 }).references(() => users.id)
});

export const promptThreadRelations = relations(promptThreads, ({ one, many }) => ({
  user: one(users, {
    fields: [promptThreads.userId],
    references: [users.id]
  }),
  prompts: many(prompts)
}));