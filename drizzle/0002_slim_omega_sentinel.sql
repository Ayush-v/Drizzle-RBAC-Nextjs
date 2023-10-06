CREATE TABLE IF NOT EXISTS "permission" (
	"id" uuid PRIMARY KEY NOT NULL,
	"action" varchar(256) NOT NULL,
	"entity" varchar(256) NOT NULL,
	"access" varchar(256) NOT NULL,
	"description" text DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "permission_action_unique" UNIQUE("action"),
	CONSTRAINT "permission_entity_unique" UNIQUE("entity"),
	CONSTRAINT "permission_access_unique" UNIQUE("access")
);
--> statement-breakpoint
ALTER TABLE "role" ALTER COLUMN "description" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "role" ADD CONSTRAINT "role_name_unique" UNIQUE("name");