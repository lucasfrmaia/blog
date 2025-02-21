"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

interface ContextProviderProps {
   children: React.ReactNode;
}

const queryClient = new QueryClient();

export function ContextProvider({ children }: ContextProviderProps) {
   return (
      <SessionProvider>
         <QueryClientProvider client={queryClient}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               {children}
               <Toaster />
            </ThemeProvider>
         </QueryClientProvider>
      </SessionProvider>
   );
}
