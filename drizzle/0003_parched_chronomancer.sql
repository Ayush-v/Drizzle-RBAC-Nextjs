CREATE TABLE IF NOT EXISTS "notes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"owner_id" integer NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
