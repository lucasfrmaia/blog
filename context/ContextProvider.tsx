"use client";

import { ThemeProvider } from "./ThemeContext";
import { SessionProvider } from "next-auth/react";

export function ContextProvider({ children }: { children: React.ReactNode }) {
   return (
      <ThemeProvider attribute="class" defaultTheme="dark">
         <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
   );
}
