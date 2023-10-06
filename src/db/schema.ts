import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique(),
  password: varchar("password", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true }),
});
