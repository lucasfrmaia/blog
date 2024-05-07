"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import SearchBar from "../ui/utils/SearchBar";
import BaseSection from "../ui/utils/BaseSection";
import FiltersWithLabel from "../ui/utils/FilterIcon";
import { Button } from "../ui/button";
import { IPost } from "@/app/(entities)/interfaces";
import {
   PostContainer,
   PostImage,
   PostContent,
   PostHeader,
   PostCategories,
   PostTitle,
   PostDescription,
   PostReadMoreButton,
} from "../post/PostComponets";

type IPropContentPostPage = {
   children?: React.ReactNode;
   className?: string;
};

const SortSelect = () => {
   "use client";

   return (
      <div className="mb-4">
         <h3 className="text-xl font-bold mb-2">Ordenação</h3>

         <Select>
            <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   );
};

export default function ContentPostPage({
   children,
   className,
}: IPropContentPostPage) {
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
            title: "Ciência",
            color: "#007bff",
         },
      ],
   }));

   return (
      <div className={cn("px-space-page mb-auto", className)}>
         <div className="flex justify-between">
            <div className="flex-1 flex items-start gap-x-6 mb-4">
               <div className="w-[30%] flex flex-col flex-wrap">
                  <h3 className="text-xl font-bold mb-2">Categorias</h3>

                  <ToggleGroup className="flex flex-wrap" type="multiple">
                     {Array.from({ length: 5 }).map((x) => {
                        return (
                           <ToggleGroupItem value="a">Ciência</ToggleGroupItem>
                        );
                     })}
                  </ToggleGroup>
               </div>

               <div>
                  <SortSelect />
                  <Button>Aplicar Filtros</Button>
               </div>
            </div>

            <SearchBar
               placeholder="Digite sua pesquisa..."
               className="h-10 bg-secondary"
            />
         </div>

         <div>
            {posts.map(
               ({ title, categories, description, img, id, createdAt }) => {
                  return (
                     <PostContainer key={`SearchPost-${id}`}>
                        <PostImage
                           src={img || ""}
                           alt={`Post Image- ${title}`}
                        ></PostImage>

                        <PostContent>
                           <PostHeader className="flex gap-x-2">
                              {new Date(createdAt).toDateString()}
                              <span>•</span>
                              <PostCategories categories={categories} />
                           </PostHeader>

                           <PostTitle>{title}</PostTitle>
                           <PostDescription>{description}</PostDescription>
                           <PostReadMoreButton onClick={() => {}} />
                        </PostContent>
                     </PostContainer>
                  );
               }
            )}
         </div>
      </div>
   );
}
