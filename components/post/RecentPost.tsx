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
} from "./PostComponets";
import { IPost } from "@/app/(entities)/interfaces";
import TitleSection from "../ui/utils/TitleSection";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type IPropRecentPost = {
   children?: React.ReactNode;
   className?: string;
};

export default function RecentPost({ children, className }: IPropRecentPost) {
   const posts: IPost[] = Array.from({ length: 5 })
      .map((x) => ({
         id: "1",
         createdAt: new Date(),
         updateAt: new Date(),
         slug: "post-1",
         title: "Post 1",
         description: "Description of post 1",
         img: "https://t3.ftcdn.net/jpg/05/27/49/44/360_F_527494416_7PWpMBqkWQarxhOgD1vIDzhDxizP1cQd.jpg",
         views: 100,
         catSlug: "technology",
         userEmail: "user1@example.com",
         categories: [
            {
               id: "2",
               slug: "science",
               title: "Ciência",
               color: "#007bff",
            },
         ],
      }))
      .slice(0, 3);

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
