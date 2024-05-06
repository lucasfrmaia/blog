import React from "react";
import { Switch } from "../ui/switch";
import { GiThrustBend } from "react-icons/gi";
import { BsGithub, BsTwitter } from "react-icons/bs";

type IPropNaveBar = {
   children?: React.ReactNode;
   className?: string;
};

export default function NaveBar({ children, className }: IPropNaveBar) {
   return (
      <header className="flex px-space-page justify-between items-center h-24 w-full">
         <div className="flex items-center space-x-2  flex-1">
            <BsGithub className="h-8 w-8" />
            <BsTwitter className="h-8 w-8" />
         </div>

         <div className="flex-1">
            <h1 className="text-2xl font-semibold">Maia Blog</h1>
         </div>

         <div className="flex justify-around items-center flex-1 gap-x-2 ">
            <Switch />

            <ul className="flex flex-1 items-center justify-around gap-x-2">
               <li className="cursor-pointer hover:text-secondary-foreground">
                  HomePage
               </li>
               <li className="cursor-pointer hover:text-secondary-foreground">
                  Contact
               </li>
               <li className="cursor-pointer hover:text-secondary-foreground">
                  About
               </li>
               <li className="cursor-pointer hover:text-secondary-foreground"></li>
            </ul>
         </div>
      </header>
   );
}
