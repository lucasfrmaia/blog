import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { PROTECTED_ROUTES, ROUTES_PAGE } from "./utils/constantes/routes";

export default withAuth(
   function middleware(req) {
      const token = req.nextauth.token;
      const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
         req.nextUrl.pathname.startsWith(route)
      );

      // Se não estiver autenticado e tentar acessar rota protegida
      if (!token && isProtectedRoute) {
         return NextResponse.redirect(new URL(ROUTES_PAGE.login.link, req.url));
      }

      // Se for rota de admin e usuário não for admin
      if (
         req.nextUrl.pathname.startsWith("/dashboard") &&
         token?.role !== "admin"
      ) {
         return NextResponse.redirect(new URL(ROUTES_PAGE.home.link, req.url));
      }

      return NextResponse.next();
   },
   {
      callbacks: {
         authorized: ({ token }) => !!token,
      },
   }
);

export const config = {
   matcher: [
      "/dashboard/:path*",
      "/profile/:path*",
      "/settings/:path*",
      "/my-posts/:path*",
      "/my-comments/:path*",
   ],
};
