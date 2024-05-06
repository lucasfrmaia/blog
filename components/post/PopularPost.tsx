import React from "react";
import {
   PostContainer,
   PostImage,
   PostContent,
   PostTitle,
   PostCategories,
   PostDescription,
} from "./PostComponets";

type IPropPopularPost = {
   children?: React.ReactNode;
   className?: string;
};

export default function PopularPost({ children, className }: IPropPopularPost) {
   const posts: IPost[] = [];

   return (
      <article className={className}>
         <h4 className="text-muted-foreground">Oque está</h4>
         <h3 className="font-bold">Posts Populares</h3>
         <div>
            {posts.map(({ title, categories, description, img, id }) => {
               return (
                  <PostContainer key={`RecentPost-${id}`}>
                     <PostContent>
                        <PostTitle>{title}</PostTitle>
                        <PostCategories categories={categories} />
                        <PostDescription>{description}</PostDescription>
                     </PostContent>
                  </PostContainer>
               );
            })}
         </div>
      </article>
   );
}
