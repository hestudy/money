CREATE TABLE `stock` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stock_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`stock_id`) REFERENCES `all_stock`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `stock_daily` (
	`id` text PRIMARY KEY NOT NULL,
	`stock_id` text NOT NULL,
	`trade_date` text NOT NULL,
	`close` real NOT NULL,
	`turnover_rate` real NOT NULL,
	`turnover_rate_f` real NOT NULL,
	`volume_ratio` real NOT NULL,
	`pe` real NOT NULL,
	`pe_ttm` real NOT NULL,
	`pb` real NOT NULL,
	`ps` real NOT NULL,
	`ps_ttm` real NOT NULL,
	`dv_ratio` real NOT NULL,
	`dv_ttm` real NOT NULL,
	`total_share` real NOT NULL,
	`float_share` real NOT NULL,
	`free_share` real NOT NULL,
	`total_mv` real NOT NULL,
	`circ_mv` real NOT NULL,
	`limit_status` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `stock_price` (
	`id` text PRIMARY KEY NOT NULL,
	`stock_id` text NOT NULL,
	`trade_date` text NOT NULL,
	`open` real NOT NULL,
	`high` real NOT NULL,
	`low` real NOT NULL,
	`close` real NOT NULL,
	`pre_close` real NOT NULL,
	`change` real NOT NULL,
	`pct_change` real NOT NULL,
	`vol` real NOT NULL,
	`amount` real NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON UPDATE no action ON DELETE cascade
);
