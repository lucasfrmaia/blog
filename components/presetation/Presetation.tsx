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
import Link from "next/link";
import { randomApiManager } from "@/services/modules/ApiManager";
import { useQuery } from "@tanstack/react-query";

type IPropPresetation = {
   children?: React.ReactNode;
   className?: string;
};

export default function Presetation({ children, className }: IPropPresetation) {
   const { data: post, isLoading } = useQuery({
      queryKey: ["last_post"],
      queryFn: async () => {
         const response = await randomApiManager.post.getLastPost();

         return response;
      },
   });

   if (isLoading || post == null) {
      return null;
   }

   return (
      <BaseSection>
         <div className="w-[80%] mb-4">
            <h1 className="text-[3rem] font-normal">
               <span className="font-semibold">Olá Devs! </span>
               Explore minhas histórias e artigos.
            </h1>
         </div>

         <PostContainer className="flex gap-x-4 items-center">
            <PostImage
               className="w-64 h-52 object-cover"
               post={post}
               alt={`Imagem do post ${post.title}`}
            ></PostImage>

            <PostContent>
               <PostTitle post={post} />
               <PostDescription post={post} />

               <div className="flex gap-x-2 items-center">
                  <PostReadMoreButton post={post} />
                  <Link href={"/posts"}>
                     <Button variant="link">Ver Todos</Button>
                  </Link>
               </div>
            </PostContent>
         </PostContainer>
      </BaseSection>
   );
}
