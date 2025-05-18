"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
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
import { AMOUNT_POST_RECENT } from "@/utils/constantes/constants";
import TitleSection from "../ui/utils/TitleSection";
import { cn } from "@/lib/utils";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";

interface ICategoryPostsProps {
   children?: React.ReactNode;
   className?: string;
   // Outras props aqui
}

const CategoryPosts: React.FC<ICategoryPostsProps> = ({
   children,
   className = "",
   // Outras props aqui
}) => {
   const { data: categories, isLoading } = useQuery<ICategory[]>({
      queryKey: ["categories"],
      queryFn: async () => {
         const response = await fetch("/api/categories");
         if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
         }
         return response.json();
      },
   });

   if (categories == null || isLoading) {
      return null;
   }

   return (
      <article className={cn("", className)}>
         <h4 className="text-muted-foreground">Procure por categoria</h4>
         <TitleSection>Categorias Populares</TitleSection>

         <ul className="flex flex-wrap gap-4">
            {categories.map(({ color, name, id }) => {
               return (
                  <li
                     key={`category-popular-${id}`}
                     style={{ backgroundColor: color + "80" }}
                     className="inline-flex justify-center items-center h-9 text-center px-4 rounded-md font-bold"
                  >
                     {name}
                  </li>
               );
            })}
         </ul>
      </article>
   );
};

export default CategoryPosts;
