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
} from "./PostComponets";
import { IPost } from "@/app/(entities)/interfaces";
import TitleSection from "../ui/utils/TitleSection";

type IPropPopularPost = {
   children?: React.ReactNode;
   className?: string;
};

export default function PopularPost({ children, className }: IPropPopularPost) {
   const posts: IPost[] = Array.from({ length: 5 }).map((x) => ({
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
   }));

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
