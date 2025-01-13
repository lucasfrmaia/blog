"use client";

import { ThemeProvider } from "./ThemeContext";
import { SessionProvider } from "next-auth/react";

import {
   QueryClient,
   QueryClientProvider,
   useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ContextProvider({ children }: { children: React.ReactNode }) {
   return (
      <QueryClientProvider client={queryClient}>
         <ThemeProvider attribute="class" defaultTheme="dark">
            <SessionProvider>{children}</SessionProvider>
         </ThemeProvider>
      </QueryClientProvider>
   );
}
