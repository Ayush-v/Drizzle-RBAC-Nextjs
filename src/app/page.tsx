import { db } from "@/db";
import { users } from "@/db/schema";

export default async function Home() {
  const result = await db.select().from(users);

  return (
    <main>
      <div className="container mx-auto p-4">
        <h1>All Users from Drizzle</h1>
        <div className="space-y-2 divide-y">
          {result.map((user) => (
            <div key={user.id} className="border rounded-lg p-4">
              <h1 className="text-xl">name: {user.name}</h1>
              <h2>email: {user.email}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
