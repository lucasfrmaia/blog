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
            {posts.map(({ title, categories, description, img, id }) => {
               return (
                  <PostContainer className="mb-4" key={`RecentPost-${id}`}>
                     <PostContent>
                        <PostTitle>{title}</PostTitle>
                        <PostCategoriesBadge categories={categories} />
                        <PostDescription>{description}</PostDescription>
                     </PostContent>
                  </PostContainer>
               );
            })}
         </div>
      </article>
   );
}
