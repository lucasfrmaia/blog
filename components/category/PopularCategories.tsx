import { ICategory } from "@/app/(entities)/interfaces";
import React from "react";
import TitleSection from "../ui/utils/TitleSection";
import BaseSection from "../ui/utils/BaseSection";

type IPropPopularCategories = {
   children?: React.ReactNode;
   className?: string;
};

export default function PopularCategories({
   children,
   className,
}: IPropPopularCategories) {
   const categories: ICategory[] = Array.from({ length: 5 }).map(() => ({
      id: "2",
      slug: "science",
      title: "Ciência",
      color: "#007bff",
      img: "https://t3.ftcdn.net/jpg/05/27/49/44/360_F_527494416_7PWpMBqkWQarxhOgD1vIDzhDxizP1cQd.jpg",
   }));

   return (
      <BaseSection>
         <TitleSection>Categorias Populares</TitleSection>

         <ul className="flex justify-between items-center pl-[5%]">
            {categories.map((category) => {
               return (
                  <li
                     key={`PopularCategories-${category.id}`}
                     className="flex items-center space-x-2 font-semibold"
                  >
                     {category.img && (
                        <img
                           className="rounded-full w-10 h-10"
                           src={category.img || ""}
                           alt={`Categoria ${category.title}`}
                        />
                     )}
                     <span>{category.title}</span>
                  </li>
               );
            })}
         </ul>
      </BaseSection>
   );
}
