import { db } from "@/db";

import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  const users = await db.query.user.findMany({
    with: {
      notes: true,
      roles: {
        with: {
          role: {
            with: {
              permissions: {
                with: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <Header title="Users" description="Role Based Access Control" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="space-x-2">
                {user.roles.map((role) => (
                  <span
                    key={role.roleId}
                    className="bg-secondary rounded-lg px-2 py-0.5 text-secondary-foreground"
                  >
                    {role.role.name}
                  </span>
                ))}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {new Date(user.createdAt ?? "").toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
