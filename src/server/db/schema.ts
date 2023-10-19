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
  unique,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  username: varchar("username", { length: 256 }).unique().notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: varchar("password", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  notes: many(note),
  roles: many(usersToRoles),
}));

export const accounts = pgTable(
  "account",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

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
      .references(() => role.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
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

export const permission = pgTable(
  "permission",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    action: varchar("action", { length: 256 }).notNull(),
    entity: varchar("entity", { length: 256 }).notNull(),
    access: varchar("access", { length: 256 }).notNull(),
    description: text("description").default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (t) => ({
    unq: unique().on(t.action, t.entity, t.access),
  })
);

export const permissionRelations = relations(permission, ({ many }) => ({
  roles: many(permissionsToRoles),
}));

export const permissionsToRoles = pgTable(
  "permissions_to_roles",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade" }),
    permissionId: uuid("permission_id")
      .notNull()
      .references(() => permission.id, { onDelete: "cascade" }),
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
