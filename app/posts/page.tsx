"use client";

import React, { useReducer, useState } from "react";
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

import { IPost } from "@/services/modules/post/entities/Post";
import { useQuery } from "@tanstack/react-query";
import { randomApiManager } from "@/services/modules/ApiManager";
import CustomPagination from "@/components/pagination/CustomPagination";

type IProppage = {
   children?: React.ReactNode;
   className?: string;
};

const sortOptions: TSortOptions = {
   options: [
      { label: "alfabetica", value: "21" },
      { label: "dataCrescente", value: "21" },
   ],
};

type Action =
   | { type: "SET_SEARCH"; payload: string }
   | { type: "SET_TOGGLE_GROUP"; payload: string[] }
   | { type: "SET_SELECT"; payload: string };

interface State {
   toggleGroupValue: string[];
   selectValue: string;
   search: string;
}

const initialState: State = {
   toggleGroupValue: [],
   selectValue: "",
   search: "",
};

const reducer = (state: State, action: Action): State => {
   switch (action.type) {
      case "SET_TOGGLE_GROUP":
         return { ...state, toggleGroupValue: action.payload };
      case "SET_SELECT":
         return { ...state, selectValue: action.payload };
      case "SET_SEARCH":
         return { ...state, search: action.payload };
      default:
         return state;
   }
};

export default function page({ children, className }: IProppage) {
   const [state, dispatch] = useReducer(reducer, initialState);
   const { data: posts, isLoading } = useQuery({
      queryKey: ["all_posts"],
      queryFn: async () => {
         const response = await randomApiManager.post.findAll(10);

         return response;
      },
   });

   const handleToggleGroupChange = (value: string[]) => {
      dispatch({ type: "SET_TOGGLE_GROUP", payload: value });
   };

   const handleSelectChange = (value: string) => {
      dispatch({ type: "SET_SELECT", payload: value });
   };

   const handleSearch = (value: string) => {
      dispatch({ type: "SET_SEARCH", payload: value });
   };

   if (isLoading) {
      return null;
   }

   return (
      <>
         <NaveBar />
         <BaseSection className={cn("px-space-page mb-auto", className)}>
            <div className="flex justify-between">
               <div className="flex-1 flex items-start gap-x-6 mb-4">
                  <ToggleGroupContainer className="w-[30%] flex flex-col flex-wrap">
                     <ToggleGroupTitle className="text-xl font-bold mb-2">
                        Categorias
                     </ToggleGroupTitle>

                     <ToggleGroupItems
                        disabled={isLoading}
                        onValueChange={handleToggleGroupChange}
                        type="multiple"
                        options={[
                           { label: "alfabetica", value: "21" },
                           { label: "dataCrescente", value: "21" },
                        ]}
                     />
                  </ToggleGroupContainer>

                  <SelectContainer>
                     <SelectTitle className="text-xl font-bold mb-2">
                        Ordenacão
                     </SelectTitle>

                     <Select
                        disabled={isLoading}
                        onValueChange={handleSelectChange}
                     >
                        <SelectTrigger className="w-[200px]">
                           <SelectValue placeholder="Select uma ordenação..." />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              {sortOptions.options.map((option) => {
                                 return (
                                    <SelectItem
                                       key={`${option.label}-${option.value}`}
                                       value={option.value}
                                    >
                                       {option.label}
                                    </SelectItem>
                                 );
                              })}
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                     <div className="flex items-center gap-x-2 mt-2">
                        <Button>Aplicar Filtros</Button>
                        <Button>Resetar Filtros</Button>
                     </div>
                  </SelectContainer>
               </div>

               <SearchBar
                  onChange={(e) => handleSearch(e.target.value)}
                  onButtonClick={() => {}}
                  disabled={isLoading}
                  placeholder="Digite sua pesquisa..."
                  className="h-10 bg-secondary"
               />
            </div>

            <div className="mt-4">
               {posts?.map((post) => {
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

            <CustomPagination currentPage={0} totalItems={100} />
         </BaseSection>
         <Footer />
      </>
   );
}
