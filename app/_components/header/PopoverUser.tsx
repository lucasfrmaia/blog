"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CiLogout } from "react-icons/ci";
import ToggleTheme from "./ToggleTheme";
import { IoIosLogOut } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { FaCommentAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { IconButton, IconLink } from "./IconSetting";

type IPropPopoverUser = {
   children?: React.ReactNode;
   className?: string;
};
const settings = [
   {
      label: "Posts Salvos",
      Icon: CiBookmark,
      href: "#",
   },
   {
      label: "Meus Comentários",
      Icon: FaCommentAlt,
      href: "/profile?tab=comments",
   },
   {
      label: "Configurações",
      Icon: CiSettings,
      href: "/profile?tab=password",
   },
];

export default function PopoverUser({ children, className }: IPropPopoverUser) {
   return (
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
               <ToggleTheme />
            </div>

            <div className="flex flex-col gap-y-2 mb-4 mt-4">
               {settings.map((setting) => {
                  return <IconLink key={`C-${setting.label}`} {...setting} />;
               })}
            </div>

            <IconButton
               onClick={() => signOut()}
               Icon={IoIosLogOut}
               label="Sair"
               className="text-destructive hover:bg-destructive/20"
            />
         </PopoverContent>
      </Popover>
   );
}
