import { ROUTES_PAGE } from "@/utils/constantes/routes";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const NextAuthOptions: AuthOptions = {
   providers: [
      CredentialsProvider({
         id: "credentials",
         name: "credentials",
         credentials: {
            email: {
               type: "text",
            },
            password: {
               type: "password",
            },
         },

         async authorize(credentials, req) {
            return null;
         },
      }),
   ],
   pages: {
      signIn: ROUTES_PAGE.login.link,
   },
};

export const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST, NextAuthOptions };
