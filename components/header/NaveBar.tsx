import React from "react";
import { Button } from "../ui/button";
import SearchBar from "../ui/utils/SearchBar";
import { useTheme } from "next-themes";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { NAVEBAR_ROUTES, ROUTES_PAGE } from "@/utils/constantes/routes";
import PopoverUser from "./PopoverUser";

type IPropNaveBar = {
   children?: React.ReactNode;
   className?: string;
};

export default async function NaveBar({ children, className }: IPropNaveBar) {
   const session = await getServerSession(NextAuthOptions);

   const links = Object.values(NAVEBAR_ROUTES);

   return (
      <>
         <div className="h-24 mb-4"></div>
         <header className="fixed top-0 left-0 z-50 flex px-space-page justify-between items-center h-24 w-full bg-card">
            <div className="flex-1">
               <h1 className="text-2xl font-semibold">
                  {" "}
                  <a href={NAVEBAR_ROUTES.home.link}>Maia Blog</a>{" "}
               </h1>
            </div>

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

            {!session && (
               <div className="flex items-center gap-x-4">
                  <ToggleTheme />
                  <Link href={ROUTES_PAGE.login.link}>
                     <Button variant="secondary">Login</Button>
                  </Link>
               </div>
            )}
            {session && <PopoverUser />}
         </header>
      </>
   );
}
