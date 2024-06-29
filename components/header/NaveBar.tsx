import React from "react";
import { Switch } from "../ui/switch";
import { GiThrustBend } from "react-icons/gi";
import { BsGithub, BsSearch, BsTwitter } from "react-icons/bs";
import { Button } from "../ui/button";
import { globalUtils } from "@/utils/classes";

type IPropNaveBar = {
   children?: React.ReactNode;
   className?: string;
};

export default function NaveBar({ children, className }: IPropNaveBar) {
   return (
      <>
         <div className="h-24 mb-4"></div>
         <header className="fixed top-0 left-0 z-50 flex px-space-page justify-between items-center h-24 w-full bg-card">
            <div className="flex-1">
               <h1 className="text-2xl font-semibold">
                  {" "}
                  <a href={globalUtils.routes.home}>Maia Blog</a>{" "}
               </h1>
            </div>

            <div className="flex justify-around items-center flex-1 gap-x-2 ">
               <ul className="flex flex-1 items-center justify-around gap-x-2">
                  <li className="cursor-pointer hover:text-blue-500">
                     <a href={globalUtils.routes.home}>HomePage</a>
                  </li>
                  <li className="cursor-pointer hover:text-blue-500">
                     <a href={globalUtils.routes.contact}>Contact</a>
                  </li>
                  <li className="cursor-pointer hover:text-blue-500">
                     <a href={globalUtils.routes.about}>About</a>
                  </li>
               </ul>
            </div>

            <div className="flex items-center justify-around">
               <Button variant="secondary">Fazer Login</Button>
            </div>
         </header>
      </>
   );
}
