import React from "react";
import { cn } from "@/lib/utils";
import TitleSection from "../ui/utils/TitleSection";
import { globalUtils } from "@/utils/classes";
import { ICategory } from "@/app/(entities)/interfaces";

type IPropAllCategories = {
   children?: React.ReactNode;
   className?: string;
};

export default async function AllCategories({
   children,
   className,
}: IPropAllCategories) {
   // const response = await fetch(globalUtils.apiRoutes.categories.all);
   // const { categories } = (await response.json()) as {
   //    categories: ICategory[];
   // };
   const { categories } = { categories: [] } as {
      categories: ICategory[];
   };

   return (
      <div className={cn("", className)}>
         <h4 className="text-muted-foreground">Procure por categoria</h4>
         <TitleSection>Categorias Populares</TitleSection>

         <ul className="flex flex-wrap gap-4">
            {categories.map(({ color, title, id }) => {
               return (
                  <li
                     key={`category-popular-${id}`}
                     style={{ backgroundColor: color + "80" }}
                     className="inline-flex justify-center items-center h-9 text-center px-4 rounded-md font-bold"
                  >
                     {title}
                  </li>
               );
            })}
         </ul>
      </div>
   );
}
