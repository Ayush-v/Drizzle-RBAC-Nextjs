import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique(),
  password: varchar("password", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const role = pgTable("role", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  description: text("description").default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const permission = pgTable("permission", {
  id: uuid("id").primaryKey(),
  action: varchar("action", { length: 256 }).unique().notNull(),
  entity: varchar("entity", { length: 256 }).unique().notNull(),
  access: varchar("access", { length: 256 }).unique().notNull(),
  description: text("description").default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});
