import React from "react";
import {
   PostContainer,
   PostImage,
   PostContent,
   PostTitle,
   PostDescription,
   PostCategories,
} from "./PostComponets";

type IPropRecentPost = {
   children?: React.ReactNode;
   className?: string;
};

export default function RecentPost({ children, className }: IPropRecentPost) {
   const posts: IPost[] = [];

   return (
      <div className={className}>
         <h3 className="text-xl font-semibold">Posts Recentes</h3>
         <div>
            {posts.map(({ title, categories, description, img, id }) => {
               return (
                  <PostContainer key={`RecentPost-${id}`}>
                     <PostImage
                        src={img || ""}
                        alt={`Post Image- ${title}`}
                     ></PostImage>

                     <PostContent>
                        <PostTitle>{title}</PostTitle>
                        <PostCategories categories={categories} />
                        <PostDescription>{description}</PostDescription>
                     </PostContent>
                  </PostContainer>
               );
            })}
         </div>
      </div>
   );
}
