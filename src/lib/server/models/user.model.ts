import {
	Cascade,
	Collection,
	Entity,
	OneToMany,
	PrimaryKey,
	Property,
	Unique,
	Enum,
	type Opt,
	ManyToOne
} from '@mikro-orm/core';
import { defaultEntities } from '@auth/mikro-orm-adapter';

import { Course } from './course.model';
import { Prompt, PromptThread } from './prompt-history.model';
import { BaseModel } from './base.model';

export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
	SUBSCRIBER = 'SUBSCRIBER'
}

@Entity()
export class User extends BaseModel implements defaultEntities.User {
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

@Entity()
export class Session extends BaseModel implements defaultEntities.Session {
	@ManyToOne({
		entity: 'User',
		hidden: true
	})
	user!: User;

	@Property({ persist: false })
	userId!: defaultEntities.Session['userId'];

	@Property({ type: 'Date' })
	expires!: defaultEntities.Session['expires'];

	@Property()
	@Unique()
	sessionToken!: defaultEntities.Session['sessionToken'];
}

@Entity()
@Unique({ properties: ['provider', 'providerAccountId'] })
export class Account extends BaseModel implements defaultEntities.Account {
	@ManyToOne({
		entity: 'User',
		hidden: true
	})
	user!: User;

	@Property({ persist: false })
	userId!: User['id'];

	@Property()
	type!: defaultEntities.Account['type'];

	@Property()
	provider!: defaultEntities.Account['provider'];

	@Property()
	providerAccountId!: defaultEntities.Account['providerAccountId'];

	@Property({ nullable: true })
	refresh_token?: defaultEntities.Account['refresh_token'];

	@Property({ nullable: true })
	access_token?: defaultEntities.Account['access_token'];

	@Property({ nullable: true })
	expires_at?: defaultEntities.Account['expires_at'];

	@Property({ nullable: true })
	token_type?: defaultEntities.Account['token_type'];

	@Property({ nullable: true })
	scope?: defaultEntities.Account['scope'];

	@Property({ nullable: true })
	id_token?: defaultEntities.Account['id_token'];

	@Property({ nullable: true })
	session_state?: defaultEntities.Account['session_state'];
}

@Entity()
@Unique({ properties: ['token', 'identifier'] })
export class VerificationToken implements defaultEntities.VerificationToken {
	@PrimaryKey()
	@Property()
	token!: defaultEntities.VerificationToken['token'];

	@Property({ type: 'Date' })
	expires!: defaultEntities.VerificationToken['expires'];

	@Property()
	identifier!: defaultEntities.VerificationToken['identifier'];
}
