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
import ToggleGroupItems, {
   ToggleGroupContainer,
   ToggleGroupTitle,
} from "@/components/filters-post/ToggleGroup";
import {
   SelectContainer,
   SelectTitle,
   TSortOptions,
} from "@/components/filters-post/Select";
import PostFilters from "@/components/posts/PostFilters";
import PostPagination from "@/components/posts/PostPagination";

type IProppage = {
   children?: React.ReactNode;
   className?: string;
};

export default function page({ children, className }: IProppage) {
   const { posts } = { posts: [] as IPost[] };

   return (
      <>
         <NaveBar />
         <BaseSection className={cn("px-space-page mb-auto", className)}>
            <PostFilters />

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
                           <PostReadMoreButton post={post} />
                        </PostContent>
                     </PostContainer>
                  );
               })}
            </div>

            <PostPagination />
         </BaseSection>
         <Footer />
      </>
   );
}
