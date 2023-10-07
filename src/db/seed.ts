import { Pool } from "pg";
import { notes, users } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { createUser } from "./db-utils";
import { faker } from "@faker-js/faker";

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const db = drizzle(pool);

const main = async () => {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);
  console.time("🧹 Cleaned up the database...");
  await db.delete(notes);
  await db.delete(users);
  console.timeEnd("🧹 Cleaned up the database...");

  const totalUsers = 3;
  console.time(`👤 Creating ${totalUsers} users...`);
  for (let i = 0; i < totalUsers; i++) {
    const user = createUser();

    await db.insert(users).values(user);

    const notesToInsert = Array.from({
      length: faker.number.int({ min: 1, max: 5 }),
    }).map(() => ({
      owner: user.username,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    }));

    console.log("notes", notesToInsert);

    await db.insert(notes).values(notesToInsert);
  }
  console.timeEnd(`👤 Created ${totalUsers} users...`);

  console.timeEnd(`🌱 Database has been seeded`);
  pool.end();
  process.exit(0);
};

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
