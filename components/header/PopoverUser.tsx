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

type IPropPopoverUser = {
   children?: React.ReactNode;
   className?: string;
};

const Setting = ({ children, className }: IPropPopoverUser) => {
   return (
      <div
         className={cn(
            "flex p-1 gap-x-2 items-center w-full h-auto hover:bg-white/30 cursor-pointer",
            className
         )}
      >
         {children}
      </div>
   );
};

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
               <Setting>
                  <CiBookmark />
                  <span>Posts Salvos</span>
               </Setting>

               <Setting>
                  <FaCommentAlt />
                  <span>Meus Comentários</span>
               </Setting>

               <Setting>
                  <CiSettings />
                  <span>Configurações</span>
               </Setting>
            </div>

            <Setting className="text-destructive hover:bg-destructive/20">
               <IoIosLogOut />
               <span>Sair</span>
            </Setting>
         </PopoverContent>
      </Popover>
   );
}
