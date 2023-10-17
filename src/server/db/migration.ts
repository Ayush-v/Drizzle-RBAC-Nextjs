/* 
This file was previously used to generate migrations based on you DrizzleORM schema. Now it is no longer in use because drizzle fixed the issue with the drizzle-kit generate:pg
*/

/* 
It can still be used and working perfectly fine but i would preffer the built in way
*/

// import { env } from "@/env";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: env.DB_URL,
// });

// const db = drizzle(pool);

// async function main() {
//   console.log("migrating... 🚀");
//   await migrate(db, { migrationsFolder: "drizzle" });
//   console.log("migration complete... ✨");
//   process.exit(0);
// }

// main().catch((err) => {
//   console.log(err);
//   process.exit(0);
// });
