import { Config } from "drizzle-kit";
import { env } from "@/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgres://Ayush-v:oP9qa4MbyNpK@ep-cool-waterfall-43307763-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=required",
  },
} satisfies Config;
