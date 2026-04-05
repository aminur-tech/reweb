import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            "https://re-web-server.vercel.app/api/v1/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );
          return {
            id: data.data._id,
            email: data.data.email,
            name: data.data.name,
            image: data.data.profileImg,
            role: data.data.role,
            accessToken: data.token,
          };
        } catch (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          throw new Error(
            axiosError.response?.data?.message || "Invalid credentials",
          );
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { data } = await axios.post(
            "https://re-web-server.vercel.app/api/v1/auth/google",
            {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          );
          user.accessToken = data.token;
          user.role = data.data.role;
        } catch (error) {
          console.error("Google SignIn Error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.name = user.name;
        token.picture = user.image;
      }

      if (trigger === "update" && session) {
        if (session.user?.name) token.name = session.user.name;
        if (session.user?.image) {
          token.picture = session.user.image; 
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.accessToken = token.accessToken as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
