import { Pool } from "pg";
import { users } from "./schema";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/node-postgres";
// import { env } from "process";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const db = drizzle(pool);

const main = async () => {
  const data: (typeof users.$inferInsert)[] = [];

  for (let i = 0; i < 20; i++) {
    data.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }

  console.log("Seeding start");
  //   console.log(data);
  await db.insert(users).values(data);
  console.log("Seed done");
  process.exit(0);
};

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
