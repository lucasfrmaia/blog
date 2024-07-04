"use client";

import React from "react";
import {
   PostContainer,
   PostImage,
   PostContent,
   PostTitle,
   PostDescription,
   PostCategories,
   PostReadMoreButton,
   PostHeader,
} from "../post-component/PostComponent";
import { IPost } from "@/app/(entities)/interfaces";
import TitleSection from "../ui/utils/TitleSection";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { globalUtils } from "@/utils/classes";

type IPropRecentPost = {
   children?: React.ReactNode;
   className?: string;
};

export default async function RecentPost({
   children,
   className,
}: IPropRecentPost) {
   //const response = await fetch(globalUtils.apiRoutes.posts.recent);
   //const { posts } = (await response.json()) as { posts: IPost[] };
   const posts = [] as IPost[];

   return (
      <div className={cn("flex flex-col", className)}>
         <TitleSection>Posts Recentes</TitleSection>
         <div>
            {posts.map(
               ({ title, categories, description, img, id, createdAt }) => {
                  return (
                     <PostContainer key={`RecentPost-${id}`}>
                        <PostImage
                           src={img || ""}
                           alt={`Post Image- ${title}`}
                        ></PostImage>

                        <PostContent>
                           <PostHeader className="flex gap-x-2">
                              {new Date(createdAt).toDateString()}
                              <span>•</span>
                              <PostCategories categories={categories} />
                           </PostHeader>

                           <PostTitle>{title}</PostTitle>
                           <PostDescription>{description}</PostDescription>
                           <PostReadMoreButton onClick={() => {}} />
                        </PostContent>
                     </PostContainer>
                  );
               }
            )}
         </div>

         <Button className="self-center">Ver Todos</Button>
      </div>
   );
}
