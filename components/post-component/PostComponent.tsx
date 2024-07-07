import { ICategory, IPost } from "@/app/(entities)/interfaces";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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
   post,
   alt,
   className,
}: {
   post: IPost;
   alt: string;
   className?: string;
}) {
   return (
      <Link href={`/posts/${post.id}`}>
         <img className={cn("", className)} src={post.img || ""} alt={alt} />
      </Link>
   );
}

export function PostTitle({
   post,
   className,
}: {
   post: IPost;
   className?: string;
}) {
   return (
      <h2 className={cn("font-bold text-3xl", className)}>
         <Link className="hover:underline" href={`/posts/${post.id}`}>
            {post.title}
         </Link>
      </h2>
   );
}

export function PostDescription({
   post,
   className,
}: {
   post: IPost;
   className?: string;
}) {
   return (
      <p className={cn("text-muted-foreground", className)}>
         {post.description}
      </p>
   );
}

export function PostReadMoreButton({
   onClick,
   className,
}: {
   onClick?: () => void;
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
   post,
   className,
   classNameLi,
}: {
   post: IPost;
   className?: string;
   classNameLi?: string;
}) {
   return (
      <ul className={cn("inline-block", className)}>
         {post.categories.map((category, index) => (
            <li key={index} className={cn("inline-block", classNameLi)}>
               <span>{category.title}</span>
            </li>
         ))}
      </ul>
   );
}

export function PostCategoriesBadge({
   post,
   className,
   classNameLi,
}: {
   post: IPost;
   className?: string;
   classNameLi?: string;
}) {
   return (
      <ul className={cn("", className)}>
         {post.categories.map((category, index) => (
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
