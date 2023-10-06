import { db } from "@/db";
import { users } from "@/db/schema";

export default async function Home() {
  const result = await db.select().from(users);

  return (
    <main>
      <div>
        <h1>Hello</h1>
        <p>{JSON.stringify(result)}</p>
      </div>
    </main>
  );
}
