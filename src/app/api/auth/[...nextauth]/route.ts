import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

const handler = NextAuth({
  providers: [
    // 🔵 Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔐 Credentials Provider (Express API)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/v1/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          if (!data.success) {
            throw new Error(data.message);
          }

          // ✅ Return user object
          return {
            id: data.data._id,
            email: data.data.email,
            role: data.data.role,
            accessToken: data.token,
          };
        } catch (error) {
          const err = error as AxiosError<{ message?: string }>;
          console.error("Authorize error:", err.response?.data?.message || err.message);
          // Instead of throwing an error, which can cause an unhandled exception
          // in the NextAuth API route and return an HTML error page,
          // we return null. NextAuth will then redirect to the sign-in page
          // with a generic error message.
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // 🔥 Google Login → Save to MongoDB
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/v1/auth/google",
            {
              email: user.email,
              name: user.name,
              image: user.image,
            }
          );

          if (!data.success) {
            throw new Error("Google login failed");
          }

          // ✅ Attach backend token
          user.accessToken = data.token;
          user.role = data.data.role;
        } catch (error) {
          console.error("Google SignIn Error:", error);
          return false;
        }
      }

      return true;
    },

    // 🔐 Store token in JWT
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },

    // 📦 Send to frontend
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.role = token.role as string;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };