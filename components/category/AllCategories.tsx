import React from "react";
import { cn } from "@/lib/utils";
import TitleSection from "../ui/utils/TitleSection";

type IPropAllCategories = {
   children?: React.ReactNode;
   className?: string;
};

export default function AllCategories({
   children,
   className,
}: IPropAllCategories) {
   const categories = Array.from({ length: 5 }).map(() => ({
      id: "2",
      slug: "science",
      title: "Science",
      color: "#007bff",
   }));

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
