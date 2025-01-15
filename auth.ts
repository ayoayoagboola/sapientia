import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { getUserById } from "@/data/user/user";
import { db } from "./db";
import authConfig from "./auth.config";
import { getTwoFactorConfirmationByUserId } from "./data/user/two-factor-confirmation";
import { getAccountByUserId } from "./data/user/account";
import { twoFactorConfirmations, users } from "./schema";
import { eq } from "drizzle-orm";

// TODO: support for two-factor auth + email 

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id as string));
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow OAuth w/out email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // prevent sign in w/out email verification
      // if (!existingUser?.emailVerified) return false;

      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //     existingUser.id
      //   );

      //   if (!twoFactorConfirmation) return false;

      //   // delete two factor confirmation for next sign in
      //   await db
      //     .delete(twoFactorConfirmations)
      //     .where(eq(twoFactorConfirmations.id, twoFactorConfirmation.id));
      // }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.image = token.picture;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.firstName;
      token.email = existingUser.email;
      token.picture = existingUser.image;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
