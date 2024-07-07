"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

type IPropSearchBar = {
   className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchBar({ className, ...props }: IPropSearchBar) {
   const [isClicked, setIsClicked] = useState(false);

   const handleFocus = () => {
      setIsClicked(true);
   };

   const handleBlur = () => {
      setIsClicked(false);
   };

   return (
      <div
         className={cn(
            "inline-flex justify-between items-center rounded-sm bg-transparent p-3",
            `${isClicked ? "outline outline-1 outline-teal-500" : ""}`,
            className
         )}
      >
         <input
            className=" bg-transparent flex-1 outline-none"
            {...props}
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
         />

         <button className="clear-none">
            <IoIosSearch className="text-foreground" size={21} />
         </button>
      </div>
   );
}
