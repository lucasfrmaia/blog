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

type IPropPresetation = {
   children?: React.ReactNode;
   className?: string;
};

export default async function Presetation({
   children,
   className,
}: IPropPresetation) {
   const post = await randomApiManager.post.getLastPost();

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
