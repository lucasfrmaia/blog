"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

type IPropToggleTheme = {
   children?: React.ReactNode;
   className?: string;
};

export default function ToggleTheme({ children, className }: IPropToggleTheme) {
   const { setTheme, theme } = useTheme();

   const toggleTheme = () => {
      setTheme(theme === "ligth" ? "dark" : "ligth");
   };

   return (
      <div
         className={cn(
            "flex items-center justify-center dark:hover:bg-[#606770] w-9 h-9 rounded-full",
            className
         )}
      >
         {theme === "ligth" && (
            <SunIcon
               onClick={toggleTheme}
               className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
         )}
         {theme === "dark" && (
            <MoonIcon
               onClick={toggleTheme}
               className="h-[1.2rem] w-[1.2rem] transition-all"
            />
         )}
      </div>
   );
}
