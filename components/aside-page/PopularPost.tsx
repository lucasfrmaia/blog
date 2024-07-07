import React from "react";
import {
   PostContainer,
   PostImage,
   PostContent,
   PostTitle,
   PostCategories,
   PostDescription,
   PostReadMoreButton,
   PostCategoriesBadge,
} from "../post-component/PostComponent";
import { IPost } from "@/app/(entities)/interfaces";
import TitleSection from "../ui/utils/TitleSection";
import { globalUtils } from "@/utils/classes";

type IPropPopularPost = {
   children?: React.ReactNode;
   className?: string;
};

export default async function PopularPost({
   children,
   className,
}: IPropPopularPost) {
   const response = await fetch(globalUtils.apiRoutes.posts.popular);
   const { posts } = (await response.json()) as { posts: IPost[] };

   return (
      <article className={className}>
         <h4 className="text-muted-foreground">Oque está em alta</h4>
         <TitleSection>Posts Populares</TitleSection>

         <div>
            {posts.map((post) => {
               return (
                  <PostContainer className="mb-4" key={`RecentPost-${post.id}`}>
                     <PostContent>
                        <PostTitle post={post} />
                        <PostCategoriesBadge post={post} />
                        <PostDescription post={post} />
                     </PostContent>
                  </PostContainer>
               );
            })}
         </div>
      </article>
   );
}
