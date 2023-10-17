import { faker } from "@faker-js/faker";
import { UniqueEnforcer } from "enforce-unique";
import bcrypt from "bcryptjs";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";

const uniqueUsernameEnforcer = new UniqueEnforcer();

export function createUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const username = uniqueUsernameEnforcer
    .enforce(() => {
      return (
        faker.string.alphanumeric({ length: 2 }) +
        "_" +
        faker.internet.userName({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
        })
      );
    })
    .slice(0, 20)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");

  return {
    username,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
  };
}

export function createPassword(password: string = faker.internet.password()) {
  return bcrypt.hashSync(password, 10);
}

export async function cleanupDB<T extends TableConfig>(
  schema: NodePgDatabase<Record<string, never>>,
  table: PgTableWithColumns<T>
) {
  await schema.delete(table);
}
