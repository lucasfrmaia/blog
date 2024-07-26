import React from "react";
import { cn } from "@/lib/utils";
import NaveBar from "@/components/header/NaveBar";
import Footer from "@/components/footer/Footer";
import BaseSection from "@/components/ui/utils/BaseSection";
import { IPost } from "@/services/modules/post/entities/Post";

type IPropPage = {
   children?: React.ReactNode;
   className?: string;
};

export default function Page({ children, className }: IPropPage) {
   const post: IPost = {
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
   };

   return (
      <>
         <NaveBar />

         <BaseSection>
            <h1 className="text-4xl font-semibold">{post.title}</h1>

            <ul className="flex items-center gap-x-2">
               {post.categories.map((category) => (
                  <li key={`Post-${post.id}-${category.id}`}>
                     {category.title}
                  </li>
               ))}
            </ul>
         </BaseSection>

         <Footer />
      </>
   );
}
