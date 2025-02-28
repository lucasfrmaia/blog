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

               return {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role?.[0]?.name || "user",
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
         return token;
      },
      async session({ session, token }) {
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
});

export { handler as GET, handler as POST };
