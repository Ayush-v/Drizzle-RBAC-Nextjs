import { db } from "@/db";

export default async function Home() {
  const users = await db.query.user.findMany({
    with: {
      notes: true,
      roles: {
        with: {
          role: true,
        },
      },
    },
  });

  return (
    <main>
      <div className="container mx-auto p-4">
        <h1>All Users from Drizzle</h1>
        <p>{JSON.stringify(users)}</p>
        <div className="space-y-2 divide-y">
          {users.map((user) => (
            <div key={user.id} className="ring-1 rounded-lg p-4">
              <h1 className="text-xl">{user.name}</h1>
              <h2>mail: {user.email}</h2>
              {user.createdAt ? (
                <time>
                  <span>Created At:</span>{" "}
                  {new Date(user.createdAt).toDateString()}
                </time>
              ) : null}
              <div className="grid grid-cols-2 gap-4">
                {user.notes.map((note) => (
                  <div key={note.id} className="border">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                  </div>
                ))}
              </div>
              <div>
                {user.roles.map((role) => (
                  <div key={role.roleId}>{role?.role.name}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
