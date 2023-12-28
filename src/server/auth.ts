import { db } from "@/server/db";
import { env } from "@/env.mjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  // type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
// import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_APIKEY);

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

export const authOptions: NextAuthOptions = {
  // callbacks: {
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //     },
  //   }),
  // },
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
      // authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    // {
    //   id: "resend",
    //   type: "email",
    //   async sendVerificationRequest({ identifier, url }) {
    //     const { host } = new URL(url);

    //     try {
    //       const data = await resend.emails.send({
    //         from: "YOUR_VERIFIED_DOMAIN",
    //         to: [identifier],
    //         subject: `Log in to ${host}`,
    //         text: `Sign in to ${host}\n${url}\n\n`,
    //         react: MagicLinkEmail({ url, host }),
    //       });
    //       return { success: true, data };
    //     } catch (error) {
    //       throw new Error("Failed to send the verification Email.");
    //     }
    //   },
    // },
  ],
  secret: env.NEXTAUTH_SECRET ?? "",
  pages: {
    signIn: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
// export const getServerAuthSession = () => getServerSession(authOptions);
