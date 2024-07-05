import { ThemeProvider } from "./ThemeContext";

export function ContextProvider({ children }: { children: React.ReactNode }) {
   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
         {children}
      </ThemeProvider>
   );
}
