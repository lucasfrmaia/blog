import * as React from "react";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

interface IPropsBase {
   Icon: IconType;
   label: string;
   className?: string;
}

interface IconLinkProps extends IPropsBase {
   href: string;
}

interface IconButtonProps extends IPropsBase {
   onClick: () => void;
}

const IconLink: React.FC<IconLinkProps> = ({
   href,
   Icon,
   label,
   className,
}) => {
   return (
      <Link
         href={href}
         className={cn(
            "flex items-center gap-2 p-2 hover:underline",
            className
         )}
      >
         <Icon />
         <span>{label}</span>
      </Link>
   );
};

const IconButton: React.FC<IconButtonProps> = ({
   Icon,
   label,
   onClick,
   className,
}) => {
   return (
      <button
         onClick={onClick}
         className={cn("flex items-center gap-2 p-2", className)}
      >
         <Icon />
         <span>{label}</span>
      </button>
   );
};

export { IconLink, IconButton };
