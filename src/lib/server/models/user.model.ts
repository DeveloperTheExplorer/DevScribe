import {
	Cascade,
	Collection,
	Entity,
	OneToMany,
	PrimaryKey,
	Property,
	Unique,
	Enum,
	type Opt
} from '@mikro-orm/core';
import { defaultEntities } from '@auth/mikro-orm-adapter';

import { Course } from './course.model';
import { Prompt, PromptThread } from './prompt-history.model';
import { generateUUID } from '$lib/utils/hash.util';

export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
	SUBSCRIBER = 'SUBSCRIBER'
}

@Entity()
export class User implements defaultEntities.User {
	@PrimaryKey()
	id: string = generateUUID();

	@Property({ nullable: true })
	name?: string;

	@Property({ nullable: true })
	@Unique()
	email!: string;

	@Property({ type: 'Date', nullable: true })
	emailVerified: Date | null = null;

	@Property({ nullable: true })
	image?: string;

	@Property({ nullable: true })
	skills?: string;

	@Enum({ hidden: true })
	role: UserRole & Opt = UserRole.USER;

	@OneToMany({
		entity: () => defaultEntities.Session,
		mappedBy: (session) => session.user,
		hidden: true,
		orphanRemoval: true,
		cascade: [Cascade.ALL]
	})
	sessions = new Collection<defaultEntities.Session>(this);

	@OneToMany({
		entity: () => defaultEntities.Account,
		mappedBy: (account) => account.user,
		hidden: true,
		orphanRemoval: true,
		cascade: [Cascade.ALL]
	})
	accounts = new Collection<defaultEntities.Account>(this);

	@OneToMany(() => Prompt, (prompt) => prompt.user)
	courses = new Collection<Course>(this);

	@OneToMany(() => PromptThread, (thread) => thread.user)
	threads = new Collection<PromptThread>(this);

	@OneToMany(() => Prompt, (prompt) => prompt.user)
	prompts = new Collection<Prompt>(this);
}

export type IUser = User;
export type NewUser = Omit<User, 'id'>;
