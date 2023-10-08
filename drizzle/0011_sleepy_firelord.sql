ALTER TABLE "users_to_roles" ALTER COLUMN "role_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users_to_roles" ALTER COLUMN "role_id" SET DEFAULT gen_random_uuid();