// import { db } from "@/db";

import Link from "next/link";

export default async function Home() {
  // const users = await db.query.user.findMany({
  //   with: {
  //     notes: true,
  //     roles: {
  //       with: {
  //         role: {
  //           with: {
  //             permissions: {
  //               with: {
  //                 permission: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  return (
    <main>
      <div className="p-4">
        {/* <h1>All Users from Drizzle</h1> */}
        <h1 className="my-4">Under Construction</h1>
        <Link
          href="/dashboard"
          className="bg-black rounded-lg px-2 py-1 text-white"
        >
          &gt; Dashboard
        </Link>

        {/* <div className="space-y-2 divide-y">
          {users.map((user) => (
            <div key={user.id} className="ring-1 rounded-lg p-4">
              <h1 className="text-xl">
                {user.id}
                {user.name}
              </h1>
              <h2>mail: {user.email}</h2>
              {user.createdAt ? (
                <time>
                  <span>Created At:</span>{" "}
                  {new Date(user.createdAt).toLocaleString()}
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
              <div>
                {user.roles.map((role) => (
                  <div key={role.roleId}>
                    {role.role.permissions.map((permission) => (
                      <div key={permission.permissionId}>
                        <span>{permission.permission.access}</span>{" "}
                        <span>{permission.permission.action}</span>{" "}
                        <span>{permission.permission.entity}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </main>
  );
}
