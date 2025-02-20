import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiManager } from "@/services/modules/ApiManager";
import { AuthUser } from "@/utils/types/auth";

const handler = NextAuth({
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            try {
               if (!credentials?.email || !credentials?.password) {
                  return null;
               }

               const user = await apiManager.user.authenticate(
                  credentials.email,
                  credentials.password
               );

               if (!user) {
                  return null;
               }

               return user as AuthUser;
            } catch (error) {
               return null;
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.role = (user as AuthUser).role;
         }
         return token;
      },
      async session({ session, token }) {
         if (session.user) {
            (session.user as AuthUser).role = token.role as AuthUser["role"];
         }
         return session;
      },
   },
   pages: {
      signIn: "/login",
      error: "/login",
   },
});

export { handler as GET, handler as POST };
