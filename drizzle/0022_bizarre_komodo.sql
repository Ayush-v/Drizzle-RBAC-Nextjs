ALTER TABLE "account" DROP CONSTRAINT "account_provider_providerAccountId";--> statement-breakpoint
ALTER TABLE "permissions_to_roles" DROP CONSTRAINT "permissions_to_roles_role_id_permission_id";--> statement-breakpoint
ALTER TABLE "users_to_roles" DROP CONSTRAINT "users_to_roles_role_id_user_id";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_identifier_token";--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "owner" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users_to_roles" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "permissions_to_roles_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id");--> statement-breakpoint
ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_role_id_user_id_pk" PRIMARY KEY("role_id","user_id");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token");