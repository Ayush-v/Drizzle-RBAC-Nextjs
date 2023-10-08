import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  username: varchar("username", { length: 256 }).unique().notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  notes: many(note),
  roles: many(usersToRoles),
}));

export const role = pgTable("role", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  description: text("description").default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const roleRelations = relations(role, ({ many }) => ({
  users: many(usersToRoles),
  permissions: many(permissionsToRoles),
}));

export const usersToRoles = pgTable(
  "users_to_roles",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => role.id),
    userId: integer("user_id")
      .notNull()
      .references(() => user.id),
  },
  (t) => ({
    pk: primaryKey(t.roleId, t.userId),
  })
);

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  role: one(role, {
    fields: [usersToRoles.roleId],
    references: [role.id],
  }),
  user: one(user, {
    fields: [usersToRoles.userId],
    references: [user.id],
  }),
}));

export const permission = pgTable("permission", {
  id: uuid("id").primaryKey().defaultRandom(),
  action: varchar("action", { length: 256 }).unique().notNull(),
  entity: varchar("entity", { length: 256 }).unique().notNull(),
  access: varchar("access", { length: 256 }).unique().notNull(),
  description: text("description").default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const permissionRelations = relations(permission, ({ many }) => ({
  roles: many(permissionsToRoles),
}));

export const permissionsToRoles = pgTable(
  "permissions_to_roles",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => role.id),
    permissionId: uuid("permission_id")
      .notNull()
      .references(() => permission.id),
  },
  (t) => ({
    pk: primaryKey(t.roleId, t.permissionId),
  })
);

export const permissionsToRolesRelations = relations(
  permissionsToRoles,
  ({ one }) => ({
    role: one(role, {
      fields: [permissionsToRoles.roleId],
      references: [role.id],
    }),
    permission: one(permission, {
      fields: [permissionsToRoles.permissionId],
      references: [permission.id],
    }),
  })
);

export const note = pgTable("note", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  ownerId: varchar("owner").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const noteReations = relations(note, ({ one }) => ({
  owner: one(user, { fields: [note.ownerId], references: [user.username] }),
}));
