DO $$ BEGIN
 ALTER TABLE "note" ADD CONSTRAINT "note_owner_user_username_fk" FOREIGN KEY ("owner") REFERENCES "user"("username") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
