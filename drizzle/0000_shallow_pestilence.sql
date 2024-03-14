CREATE TABLE `chapters` (
	`id` varchar(36) NOT NULL,
	`name` varchar(128),
	`description` text,
	`duration` int,
	`skills` text,
	`difficulty` int,
	`technologies` text,
	`model_used` varchar(128),
	`content` text,
	`course_id` varchar(36),
	CONSTRAINT `chapters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` varchar(36) NOT NULL,
	`name` varchar(128) NOT NULL,
	`slug` varchar(128) NOT NULL,
	`description` text,
	`duration` int NOT NULL,
	`progress` int NOT NULL,
	`skills` text,
	`difficulty` int,
	`technologies` text NOT NULL,
	`model_used` varchar(128) NOT NULL,
	`prompt` text NOT NULL,
	`prompt_hash` text NOT NULL,
	`content_hash` varchar(64) NOT NULL,
	`content` text,
	`owner_id` varchar(36) NOT NULL,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `courses_slug_unique` UNIQUE(`slug`),
	CONSTRAINT `courses_content_hash_unique` UNIQUE(`content_hash`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` varchar(36) NOT NULL,
	`name` varchar(128),
	`description` text,
	`duration` int,
	`skills` text,
	`difficulty` int,
	`technologies` text,
	`status` enum('NOT_STARTED','IN_PROGRESS','COMPLETED'),
	`model_used` varchar(128),
	`content` text,
	`prompt` text,
	`lesson_index` float NOT NULL,
	`chapter_id` varchar(36),
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`),
	CONSTRAINT `lessons_chapter_id_lesson_index_unique` UNIQUE(`chapter_id`,`lesson_index`)
);
--> statement-breakpoint
CREATE TABLE `prompt_threads` (
	`id` varchar(36) NOT NULL,
	`model` varchar(128),
	`hash` varchar(128),
	`tokens_used` int,
	`approved` int,
	`timestamp` int,
	`user_id` varchar(36),
	CONSTRAINT `prompt_threads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `prompts` (
	`id` varchar(36) NOT NULL,
	`role` enum('system','user','assistant'),
	`content` text,
	`thread_id` varchar(36),
	CONSTRAINT `prompts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`userId` varchar(36) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `accounts_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(36) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `sessions_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	`skills` text,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verification_tokens_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `chapters` ADD CONSTRAINT `chapters_course_id_courses_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_chapter_id_chapters_id_fk` FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prompt_threads` ADD CONSTRAINT `prompt_threads_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prompts` ADD CONSTRAINT `prompts_thread_id_prompt_threads_id_fk` FOREIGN KEY (`thread_id`) REFERENCES `prompt_threads`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;