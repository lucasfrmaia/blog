"use client";

import CategoryList from "../_components/category/CategoryList";
import BaseLayout from "../_components/layout/BaseLayout";

export default function CategoriesPage() {
   return (
      <BaseLayout>
         <div className="container mx-auto py-8">
            <h1 className="mb-8 text-3xl font-bold">Categorias</h1>
            <CategoryList />
         </div>
      </BaseLayout>
   );
}
