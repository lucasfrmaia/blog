"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, Edit2, Trash2 } from "lucide-react";
import CategoryListLoading from "../loadings/CategoryListLoading";
import { Button } from "../ui/button";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { Column, DataTable } from "../shared/DataTable";
import { CategoryDialog } from "./dialogs/CategoryDialog";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "../ui/alert-dialog";

const PAGE_SIZE = 10;

export default function CategoryList() {
   const {
      data: categories,
      isLoading,
      refetch,
   } = useQuery<ICategory[]>({
      queryKey: ["categories"],
      queryFn: async () => {
         const response = await fetch("/api/categories");
         if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
         }
         return response.json();
      },
   });

   const handleDeleteCategory = async (id: string) => {
      await fetch(`/api/categories/${id}`, {
         method: "DELETE",
      });

      refetch();
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
         header: "Descrição",
         accessorKey: (category) => category.description,
         className: "text-center",
      },
      {
         header: "Ações",
         accessorKey: (category: ICategory) => (
            <div className="flex items-center gap-2">
               <CategoryDialog category={category} mode="edit">
                  <Button variant="ghost" size="icon">
                     <Edit2 className="h-4 w-4" />
                     <span className="sr-only">Editar categoria</span>
                  </Button>
               </CategoryDialog>

               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                     >
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Categoria</AlertDialogTitle>
                        <AlertDialogDescription>
                           Tem certeza que deseja Excluir a categoria{" "}
                           {category.name}? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                           onClick={() => handleDeleteCategory(category.id)}
                           className="bg-destructive hover:bg-destructive/90"
                        >
                           Excluir
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
            </div>
         ),
      },
   ];

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
