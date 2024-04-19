import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	type Opt,
	Enum,
	OneToMany,
	Collection
} from '@mikro-orm/core';

import { generateUUID } from '$lib/utils/hash.util';
import { User } from './user.model';
import { BaseModel } from './base.model';

export enum PrompotRole {
	SYSTEM = 'system',
	USER = 'user',
	ASSISTANT = 'assistant'
}

@Entity()
export class PromptThread extends BaseModel {
	@Property()
	model!: string;

	@Property()
	hash!: string;

	@Property()
	tokensUsed!: number;

	@Property()
	approved!: number;

	@ManyToOne(() => User)
	user?: typeof User;

	@OneToMany(() => Prompt, (prompt) => prompt.thread)
	prompts = new Collection<Prompt>(this);

	constructor(promptThread: IPromptThread) {
		super();
		this.model = promptThread.model;
		this.hash = promptThread.hash;
		this.tokensUsed = promptThread.tokensUsed;
		this.approved = promptThread.approved;
	}
}

@Entity()
export class Prompt extends BaseModel {
	@Enum()
	role!: PrompotRole;

	@Property()
	content!: string;

	@ManyToOne(() => User)
	user?: typeof User;

	@ManyToOne(() => PromptThread)
	thread?: PromptThread;

	constructor(prompt: NewIPrompt) {
		super();
		this.role = prompt.role;
		this.content = prompt.content;
	}
}

export type IPrompt = Prompt;
export type IPromptThread = PromptThread;

export type NewIPrompt = Omit<Prompt, 'id'>;

// export const prompts = mysqlTable('prompts', {
//   id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
//   role: mysqlEnum('role', drizzleEnum(PrompotRole)),
//   content: text('content'),
//   threadId: varchar('thread_id', { length: 36 }).references(() => promptThreads.id)
// });

// export const promptRelations = relations(prompts, ({ one }) => ({
//   thread: one(promptThreads, {
//     fields: [prompts.threadId],
//     references: [promptThreads.id]
//   })
// }));

// export const promptThreads = mysqlTable('prompt_threads', {
//   id: varchar('id', { length: 36 }).primaryKey().$defaultFn(generateUUID),
//   model: varchar('model', { length: 128 }),
//   hash: varchar('hash', { length: 128 }),
//   tokensUsed: int('tokens_used'),
//   approved: int('approved'),
//   timestamp: int('timestamp'),
//   userId: varchar('user_id', { length: 36 }).references(() => users.id)
// });

// export const promptThreadRelations = relations(promptThreads, ({ one, many }) => ({
//   user: one(users, {
//     fields: [promptThreads.userId],
//     references: [users.id]
//   }),
//   prompts: many(prompts)
// }));
