import { env } from "@/env";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: env.DB_URL,
});

const db = drizzle(pool);

async function main() {
  console.log("migration started..");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("migration ended..");
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
