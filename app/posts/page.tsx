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
} from "../../components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import SearchBar from "../../components/ui/utils/SearchBar";
import BaseSection from "../../components/ui/utils/BaseSection";
import FiltersWithLabel from "../../components/ui/utils/FilterIcon";
import { Button } from "../../components/ui/button";
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
} from "../../components/post-component/PostComponent";
import { globalUtils } from "@/utils/classes";
import NaveBar from "@/components/header/NaveBar";
import Footer from "@/components/footer/Footer";

type IProppage = {
   children?: React.ReactNode;
   className?: string;
};

const SortSelect = () => {
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

export default function page({ children, className }: IProppage) {
   const { posts } = { posts: [] as IPost[] };

   return (
      <>
         <NaveBar />
         <BaseSection className={cn("px-space-page mb-auto", className)}>
            <div className="flex justify-between">
               <div className="flex-1 flex items-start gap-x-6 mb-4">
                  <div className="w-[30%] flex flex-col flex-wrap">
                     <h3 className="text-xl font-bold mb-2">Categorias</h3>

                     <ToggleGroup className="flex flex-wrap" type="multiple">
                        {Array.from({ length: 5 }).map((x, y) => {
                           return (
                              <ToggleGroupItem value={`a-${y}`}>
                                 Ciência
                              </ToggleGroupItem>
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
               {posts.map((post) => {
                  return (
                     <PostContainer
                        className="flex items-center gap-x-4 mb-8 w-2/3"
                        key={`SearchPost-${post.id}`}
                     >
                        <PostImage
                           className="w-full h-32"
                           post={post}
                           alt={`Post Image- ${post.title}`}
                        ></PostImage>

                        <PostContent>
                           <PostHeader className="flex gap-x-2">
                              {new Date(post.createdAt).toDateString()}
                              <span>•</span>
                              <PostCategories post={post} />
                           </PostHeader>

                           <PostTitle post={post} />
                           <PostDescription post={post} />
                           <PostReadMoreButton onClick={() => {}} />
                        </PostContent>
                     </PostContainer>
                  );
               })}
            </div>
         </BaseSection>
         <Footer />
      </>
   );
}
