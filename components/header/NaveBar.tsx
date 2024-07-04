import React from "react";
import { Switch } from "../ui/switch";
import { GiThrustBend } from "react-icons/gi";
import { BsGithub, BsSearch, BsTwitter } from "react-icons/bs";
import { Button } from "../ui/button";
import { globalUtils } from "@/utils/classes";
import SearchBar from "../ui/utils/SearchBar";
import { FaUserAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type IPropNaveBar = {
   children?: React.ReactNode;
   className?: string;
};

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
                           <a href={link}>{label}</a>
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
                     <div className="flex flex-col justify-center items-center w-full">
                        <Avatar className="w-10 h-10">
                           <AvatarImage src="https://github.com/shadcn.png" />
                           <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>Olá! Usuário!</span>
                     </div>

                     <div>
                        <p>Tema</p>
                     </div>
                  </PopoverContent>
               </Popover>
            </div>
         </header>
      </>
   );
}
