"use client";

import React from "react";
import {
   PostContainer,
   PostContent,
   PostDescription,
   PostImage,
   PostReadMoreButton,
   PostTitle,
} from "../post-component/PostComponent";
import BaseSection from "../ui/utils/BaseSection";
import { Button } from "../ui/button";

type IPropPresetation = {
   children?: React.ReactNode;
   className?: string;
};

export default function Presetation({ children, className }: IPropPresetation) {
   const post = {
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
            title: "Science",
            color: "#007bff",
         },
      ],
   };

   return (
      <BaseSection>
         <div className="w-[80%]">
            <h1 className="text-[3rem] font-normal">
               <span className="font-semibold">Olá Devs! </span>
               Explore minhas histórias e artigos.
            </h1>
         </div>

         <PostContainer>
            <PostImage
               src={post.img}
               alt={`Imagem do post ${post.title}`}
            ></PostImage>

            <PostContent>
               <PostTitle>{post.title}</PostTitle>
               <PostDescription>{post.description}</PostDescription>

               <div className="flex gap-x-2 items-center">
                  <PostReadMoreButton onClick={() => {}} />
                  <Button variant="link">Ver Todos</Button>
               </div>
            </PostContent>
         </PostContainer>
      </BaseSection>
   );
}
