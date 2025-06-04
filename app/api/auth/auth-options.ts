import { AuthUser } from "@/utils/types/auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const NextAuthOptions = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials): Promise<AuthUser | null> {
            try {
               if (!credentials?.email || !credentials?.password) {
                  return null;
               }

               const response = await fetch(
                  "http://localhosT:3000/api/users/auth",
                  {
                     method: "POST",
                     headers: {
                        "Content-Type": "application/json",
                     },
                     body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                     }),
                  }
               );

               if (!response.ok) {
                  return null;
               }

               const user = await response.json();

               return {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role?.id,
               } as AuthUser;
            } catch (error) {
               console.error("Erro na autenticação:", error);
               return null;
            }
         },
      }),
   ],

   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.role = user.role as number;
         }

         if (user?.id) {
            token.sub = user.id;
         }

         return token;
      },
      async session({ session, token }) {
         if (session.user) {
            session.user.role = token.role as number;
            session.user.id = token.sub as string;
         }

         return session;
      },
   },
   pages: {
      signIn: "/login",
      error: "/login",
   },
   session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 dias
   },
} as AuthOptions;
