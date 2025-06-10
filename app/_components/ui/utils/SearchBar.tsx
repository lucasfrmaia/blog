'use client';

import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

type IPropSearchBar = {
   className?: string;
   isLoading?: false;
   onButtonClick: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchBar({
   className,
   isLoading,
   onButtonClick,
   ...props
}: IPropSearchBar) {
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
            'inline-flex justify-between items-center rounded-sm bg-transparent p-3',
            `${isClicked ? 'outline outline-1 outline-teal-500' : ''}`,
            className,
         )}
      >
         <input
            className=" bg-transparent flex-1 outline-none"
            {...props}
            type="text"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
         />

         <button
            onClick={onButtonClick}
            disabled={isLoading}
            className="clear-none"
         >
            <IoIosSearch className="text-foreground" size={21} />
         </button>
      </div>
   );
}
