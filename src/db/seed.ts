import { Pool } from "pg";
import {
  note,
  permission,
  permissionsToRoles,
  role,
  user,
  usersToRoles,
} from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { createPassword, createUser } from "./db-utils";
import { faker } from "@faker-js/faker";
import { db as database } from "./";

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const db = drizzle(pool);

const main = async () => {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);
  console.time("🧹 Cleaned up the database...");
  await db.delete(usersToRoles);
  await db.delete(permissionsToRoles);
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
  const persmissionAdmin = await database.query.permission.findMany({
    where: (permission, { eq }) => eq(permission.access, "any"),
  });
  const persmissionUser = await database.query.permission.findMany({
    where: (permission, { eq }) => eq(permission.entity, "own"),
  });

  const userRoleData = await db
    .insert(role)
    .values({
      name: "user",
    })
    .returning({
      roleId: role.id,
    });
  const adminRoleData = await db
    .insert(role)
    .values({
      name: "admin",
    })
    .returning({
      roleId: role.id,
    });

  console.log({ userRoleData, adminRoleData });

  await persmissionAdmin.map(
    async ({ id }) =>
      await db.insert(permissionsToRoles).values({
        permissionId: id,
        roleId: adminRoleData[0].roleId,
      })
  );

  await persmissionUser.map(
    async ({ id }) =>
      await db.insert(permissionsToRoles).values({
        permissionId: id,
        roleId: userRoleData[0].roleId,
      })
  );

  console.timeEnd("👑 Created roles...");

  const totalUsers = 3;
  console.time(`👤 Creating ${totalUsers} users and 📒Notes...`);
  for (let i = 0; i < totalUsers; i++) {
    const userData = createUser();

    const createUse = await db
      .insert(user)
      .values({ ...userData, password: createPassword(userData.username) })
      .returning({
        userId: user.id,
      });

    await db.insert(note).values(
      Array.from({
        length: faker.number.int({ min: 1, max: 5 }),
      }).map(() => ({
        ownerId: userData.username,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
      }))
    );

    await db.insert(usersToRoles).values({
      roleId: userRoleData[0].roleId,
      userId: createUse[0].userId,
    });
  }
  console.timeEnd(`👤 Creating ${totalUsers} users and 📒Notes...`);

  console.time(`👨🏻‍💻 Created admin user "Codie"`);
  const Codie = await db
    .insert(user)
    .values({
      email: "codie@code.dev",
      name: "codie",
      username: "codie",
      password: createPassword("codiedev"),
    })
    .returning({
      userId: user.id,
    });
  await db.insert(usersToRoles).values([
    {
      roleId: adminRoleData[0].roleId,
      userId: Codie[0].userId,
    },
    {
      roleId: userRoleData[0].roleId,
      userId: Codie[0].userId,
    },
  ]);
  console.time(`👨🏻‍💻 Created admin user "Codie"`);

  console.timeEnd(`🌱 Database has been seeded`);
  pool.end();
  process.exit(0);
};

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
