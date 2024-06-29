import { ICategory } from "@/app/(entities)/interfaces";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

export function PostContainer({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div className={cn("flex space-x-2 items-center", className)}>
         {children}
      </div>
   );
}

export function PostHeader({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return <div className={cn("flex items-center", className)}>{children}</div>;
}

export function PostImage({
   src,
   alt,
   className,
}: {
   src: string;
   alt: string;
   className?: string;
}) {
   return <img className={cn("flex-1", className)} src={src} alt={alt} />;
}

export function PostTitle({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return <h2 className={cn("font-bold text-3xl", className)}>{children}</h2>;
}

export function PostDescription({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return <p className={cn("text-muted-foreground", className)}>{children}</p>;
}

export function PostReadMoreButton({
   onClick,
   className,
}: {
   onClick: () => void;
   className?: string;
}) {
   return (
      <Button className={cn("w-24", className)} onClick={onClick}>
         Read More
      </Button>
   );
}

export function PostContent({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div className={cn("flex flex-1 flex-col gap-y-2", className)}>
         {children}
      </div>
   );
}

export function PostCategories({
   categories,
   className,
   classNameLi,
}: {
   categories: ICategory[];
   className?: string;
   classNameLi?: string;
}) {
   return (
      <ul className={cn("inline-block", className)}>
         {categories.map((category, index) => (
            <li key={index} className={cn("inline-block", classNameLi)}>
               <span>{category.title}</span>
            </li>
         ))}
      </ul>
   );
}

export function PostCategoriesBadge({
   categories,
   className,
   classNameLi,
}: {
   categories: ICategory[];
   className?: string;
   classNameLi?: string;
}) {
   return (
      <ul className={cn("", className)}>
         {categories.map((category, index) => (
            <li
               style={{ backgroundColor: category.color }}
               key={`PostCatrgoriesBadge-${category.slug}`}
               className={cn(
                  "inline-block px-2 text-center h-6 text-secondary rounded-3xl",
                  classNameLi
               )}
            >
               <span>{category.title}</span>
            </li>
         ))}
      </ul>
   );
}
