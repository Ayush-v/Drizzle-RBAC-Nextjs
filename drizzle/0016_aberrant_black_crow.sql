ALTER TABLE "permission" ADD CONSTRAINT "permission_action_entity_access_unique" UNIQUE("action","entity","access");