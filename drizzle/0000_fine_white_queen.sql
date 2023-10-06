CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256),
	"password" varchar(256),
	"created_at" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
