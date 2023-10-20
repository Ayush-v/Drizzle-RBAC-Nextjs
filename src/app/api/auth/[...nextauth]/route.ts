import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "process";

const handler = NextAuth({
  debug: true,
  adapter: DrizzleAdapter(db),
  //   callbacks: {
  //     session: ({ session, user }) => ({
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: user.id,
  //       },
  //     }),
  //   },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
      //   authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
  ],
  secret: env.NEXTAUTH_SECRET ?? "",
});
export { handler as GET, handler as POST };
