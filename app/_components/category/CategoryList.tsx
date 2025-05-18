"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import CategoryListLoading from "../loadings/CategoryListLoading";
import QueryError from "../errors/QueryError";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { Column, DataTable } from "../shared/DataTable";

const PAGE_SIZE = 10;

const handleDelete = (id: string) => {
   if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      // deleteCategory(id);
   }
};

const columns: Column<ICategory>[] = [
   {
      header: "Nome",
      accessorKey: (category: ICategory) => category.name,
   },
   {
      header: "Cor",
      accessorKey: (category: ICategory) => (
         <div className="flex items-center gap-2">
            <div
               className="w-4 h-4 rounded-full"
               style={{ backgroundColor: category.color }}
            />
            {category.color}
         </div>
      ),
   },
   {
      header: "Posts",
      accessorKey: (category: ICategory) => category.posts?.length || 0,
      className: "text-right",
   },
   {
      header: "Ações",
      accessorKey: (category: ICategory) => (
         <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
               <Link href={`/dashboard/categories/edit/${category.id}`}>
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Editar categoria</span>
               </Link>
            </Button>
            <Button
               variant="ghost"
               size="icon"
               className="text-destructive"
               onClick={() => handleDelete(category.id)}
            >
               <Trash2 className="h-4 w-4" />
               <span className="sr-only">Excluir categoria</span>
            </Button>
         </div>
      ),
   },
];

export default function CategoryList() {
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

   if (isLoading) return <CategoryListLoading />;

   return (
      <DataTable<ICategory>
         data={categories || []}
         columns={columns}
         pagination={{
            page: 1,
            pageSize: PAGE_SIZE,
            total: categories?.length || 0,
         }}
         onPageChange={() => {}}
      />
   );
}
