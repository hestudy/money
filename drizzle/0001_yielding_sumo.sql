CREATE TABLE `init_record` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stock` (
	`id` text PRIMARY KEY NOT NULL,
	`ts_code` text NOT NULL,
	`symbol` text NOT NULL,
	`name` text NOT NULL,
	`area` text,
	`industry` text,
	`fullname` text,
	`enname` text,
	`cnspell` text,
	`market` text,
	`exchange` text,
	`curr_type` text,
	`list_status` text,
	`list_date` text,
	`delist_date` text,
	`is_hs` text,
	`act_name` text,
	`act_ent_type` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
