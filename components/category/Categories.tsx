import React from "react";

type IPropCategories = {
   children?: React.ReactNode;
   className?: string;
};

export default function Categories({ children, className }: IPropCategories) {
   const categories: ICategory[] = [];

   return (
      <section>
         <h3 className="text-xl font-bold">Categorias Populares</h3>

         <ul className="flex justify-between items-center">
            {categories.map((category) => {
               return (
                  <li className="flex items-center space-x-2 font-semibold">
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
      </section>
   );
}
