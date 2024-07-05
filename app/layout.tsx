import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ContextProvider } from "@/context/ContextProvider";

const fontSans = FontSans({
   subsets: ["latin"],
   variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body
            className={cn(
               "bg-background font-sans antialiased",
               fontSans.variable
            )}
         >
            <ContextProvider>{children}</ContextProvider>
         </body>
      </html>
   );
}
