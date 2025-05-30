import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
import db from "./libs/db";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFileds = LoginSchema.safeParse(credentials);

        if (validatedFileds.success) {
          const { email, password } = validatedFileds.data;

          const user = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user || !user.hashedPassword) return null

          const isCorrectPassword = await bcrypt.compare(
            password,
            user.hashedPassword
          );
          if (!isCorrectPassword) return null

          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
