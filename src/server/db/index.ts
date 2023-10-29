import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { env } from "@/env.mjs";

const pool = new Pool({
  connectionString: env.DB_URL,
  // ssl: true,
});

export const db = drizzle(pool, { schema: schema });
