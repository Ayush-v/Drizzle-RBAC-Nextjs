import { Config } from "drizzle-kit";
import { env } from "@/env.mjs";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DB_URL!,
  },
} satisfies Config;
