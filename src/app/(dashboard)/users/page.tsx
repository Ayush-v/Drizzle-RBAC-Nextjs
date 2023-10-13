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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <main>
      <Header title="Users" description="Role Based Access Control" />
      <Tabs defaultValue="all" className="mb-2">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableRow className="border-none">
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
        </TabsContent>
        <TabsContent value="active">
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableRow className="border-none">
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
        </TabsContent>
      </Tabs>
    </main>
  );
}
