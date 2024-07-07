"use client";

import React from "react";
import { Button } from "../ui/button";
import { globalUtils } from "@/utils/classes";
import SearchBar from "../ui/utils/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type IPropNaveBar = {
   children?: React.ReactNode;
   className?: string;
};

export function ModeToggle() {
   const { setTheme } = useTheme();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
               <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
               <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
               Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
               Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
               System
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

export default function NaveBar({ children, className }: IPropNaveBar) {
   const links = Object.values(globalUtils.routes);

   return (
      <>
         <div className="h-24 mb-4"></div>
         <header className="fixed top-0 left-0 z-50 flex px-space-page justify-between items-center h-24 w-full bg-card">
            <div className="flex-1">
               <h1 className="text-2xl font-semibold">
                  {" "}
                  <a href={globalUtils.routes.home.link}>Maia Blog</a>{" "}
               </h1>
            </div>

            <div className="flex justify-around items-center flex-1 gap-x-2 ">
               <ul className="flex flex-1 items-center justify-around gap-x-2">
                  {links.map(({ link, label }) => {
                     return (
                        <li
                           key={`Navebar-${label}`}
                           className="cursor-pointer hover:text-blue-500"
                        >
                           <Link href={link}>{label}</Link>
                        </li>
                     );
                  })}
               </ul>
            </div>

            <div className="flex flex-1 items-center justify-around">
               <SearchBar placeholder="Buscar post..." className="h-8 w-2/3" />

               <Popover>
                  <PopoverTrigger>
                     <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                  </PopoverTrigger>

                  <PopoverContent className="flex flex-col shadow-2xl rounded-lg">
                     <div className="flex flex-col justify-center items-center w-full mb-4">
                        <Avatar className="w-10 h-10 mb-2">
                           <AvatarImage src="https://github.com/shadcn.png" />
                           <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>Olá! Usuário!</span>
                     </div>

                     <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">Tema</p>
                        <ModeToggle />
                     </div>
                  </PopoverContent>
               </Popover>
            </div>
         </header>
      </>
   );
}
