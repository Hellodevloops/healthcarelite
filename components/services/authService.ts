import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "receptionist" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "Receptionist", role: "receptionist" };
        }
        if (
          credentials?.username === "doctor" &&
          credentials?.password === "password"
        ) {
          return { id: "2", name: "Doctor", role: "doctor" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/api/auth/signin",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        // session.user.role = token.role as "receptionist" | "doctor";
      }
      return session;
    },
  },
};