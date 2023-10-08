ALTER TABLE "permissions_to_roles" ALTER COLUMN "role_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ALTER COLUMN "permission_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users_to_roles" ALTER COLUMN "role_id" SET DATA TYPE uuid;