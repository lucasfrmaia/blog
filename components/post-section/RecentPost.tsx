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
import Link from "next/link";
import { randomApiManager } from "@/services/modules/api-manager";
import { AMOUNT_POST_RECENT } from "@/utils/contasts/constants";

type IPropRecentPost = {
   children?: React.ReactNode;
   className?: string;
};

export default async function RecentPost({
   children,
   className,
}: IPropRecentPost) {
   const posts = await randomApiManager.post.findAll(AMOUNT_POST_RECENT);

   return (
      <div className={cn("flex flex-col", className)}>
         <TitleSection>Posts Recentes</TitleSection>
         <div className="mb-4">
            {posts.map((post) => {
               return (
                  <PostContainer
                     className="gap-x-4 mb-4"
                     key={`RecentPost-${post.id}`}
                  >
                     <PostImage
                        className="hover:scale-105 ease-linear h-64"
                        post={post}
                        alt={`Post Image- ${post.title}`}
                     ></PostImage>

                     <PostContent className="flex-1">
                        <PostHeader className="flex gap-x-2">
                           {new Date(post.createdAt).toDateString()}
                           <span>•</span>
                           <PostCategories post={post} />
                        </PostHeader>

                        <PostTitle post={post} />
                        <PostDescription post={post} />
                        <PostReadMoreButton post={post} />
                     </PostContent>
                  </PostContainer>
               );
            })}
         </div>

         <Link href={"/posts"}>
            <Button className="self-center">Ver Todos</Button>
         </Link>
      </div>
   );
}
