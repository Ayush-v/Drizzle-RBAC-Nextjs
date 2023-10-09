import { Pool } from "pg";
import { note, permission, permissionsToRoles, role, user } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { createPassword, createUser } from "./db-utils";
import { faker } from "@faker-js/faker";
import { db as database } from "./";
import { eq } from "drizzle-orm";

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const db = drizzle(pool);

const main = async () => {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);
  console.time("🧹 Cleaned up the database...");
  await db.delete(user);
  await db.delete(note);
  await db.delete(role);
  await db.delete(permission);
  console.timeEnd("🧹 Cleaned up the database...");

  console.time("🔑 Created Permissons...");
  const entities = ["user", "note"];
  const actions = ["create", "read", "update", "delete"];
  const accesses = ["own", "any"] as const;
  for (const entity of entities) {
    for (const action of actions) {
      for (const access of accesses) {
        await db.insert(permission).values({ entity, action, access });
      }
    }
  }
  console.timeEnd("🔑 Created Permissons...");

  console.time("👑 Created roles...");
  await db.select().from(permission).where(eq(permission.entity, "user"));
  const persmissionUser = await database.query.permission.findMany({
    where: (permission, { eq }) => eq(permission.entity, "user"),
  });
  const persmissionAdmin = await database.query.permission.findMany({
    where: (permission, { eq }) => eq(permission.entity, "admin"),
  });

  console.log({ persmissionUser, persmissionAdmin });

  // const adminRole = await db
  //   .insert(role)
  //   .values({
  //     name: "admin",
  //   })
  //   .returning({
  //     roleId: role.id,
  //   });

  // await db.insert(permissionsToRoles).values();

  await db.insert(role).values({
    name: "user",
  });
  console.timeEnd("👑 Created roles...");

  const totalUsers = 3;
  console.time(`👤 Creating ${totalUsers} users and 📒Notes...`);
  for (let i = 0; i < totalUsers; i++) {
    const userData = createUser();

    await db
      .insert(user)
      .values({ ...userData, password: createPassword(userData.username) });

    await db.insert(note).values(
      Array.from({
        length: faker.number.int({ min: 1, max: 5 }),
      }).map(() => ({
        ownerId: userData.username,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
      }))
    );
  }
  console.timeEnd(`👤 Creating ${totalUsers} users and 📒Notes...`);

  console.time(`👨🏻‍💻 Created admin user "Codie"`);
  await db.insert(user).values({
    email: "codie@code.dev",
    name: "codie",
    username: "codie",
    password: createPassword("codiedev"),
  });
  await db.insert(role).values({
    name: "admin",
  });
  console.time(`👨🏻‍💻 Created admin user "Codie"`);

  console.timeEnd(`🌱 Database has been seeded`);
  pool.end();
  process.exit(0);
};

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
