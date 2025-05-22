"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit2, Trash2 } from "lucide-react";
import CategoryListLoading from "../loadings/CategoryListLoading";
import QueryError from "../errors/QueryError";
import { useToast } from "../ui/use-toast";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { Column, DataTable } from "../shared/DataTable";
import { Button } from "../ui/button";
import { CategoryDialog } from "./dialogs/CategoryDialog";
import { Badge } from "../ui/badge";
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
import { ITENS_PER_PAGE } from "@/utils/constantes/constants";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryList() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const page = Number(searchParams?.get("page")) || 1;

   const { data, isLoading, error, refetch } = useQuery({
      queryKey: ["categories", page],
      queryFn: async () => {
         const params = new URLSearchParams({
            page: page.toString(),
            limit: ITENS_PER_PAGE.toString(),
         });

         const response = await fetch(`/api/categories/page?${params}`);

         if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
         }

         return response.json();
      },
   });

   const { mutate: deleteCategory } = useMutation({
      mutationFn: async (id: string) => {
         const response = await fetch(`/api/categories/${id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Erro ao deletar categoria");
         }
         return response.json();
      },
      onSuccess: () => {
         toast({
            title: "Categoria excluída com sucesso!",
            description: "A categoria foi removida do sistema.",
         });
         queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: () => {
         toast({
            title: "Erro ao excluir categoria",
            description: "Ocorreu um erro ao tentar excluir a categoria.",
            variant: "destructive",
         });
      },
   });

   const handleDelete = async (id: string) => {
      try {
         await deleteCategory(id);
         refetch();
      } catch (error) {
         toast({
            title: "Erro ao excluir",
            description: "Ocorreu um erro ao tentar excluir a categoria.",
            variant: "destructive",
         });
      }
   };

   const handlePageChange = (newPage: number) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
   };

   if (isLoading) return <CategoryListLoading />;

   if (error) return <QueryError onRetry={() => refetch()} />;

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
               <span>{category.color}</span>
            </div>
         ),
      },
      {
         header: "Posts",
         accessorKey: (category: ICategory) => category.posts?.length || 0,
         className: "text-right",
      },
      {
         header: "Data",
         accessorKey: (category: ICategory) => {
            return <div>{new Date(category.createdAt).toDateString()}</div>;
         },
      },
      {
         header: "Ações",
         accessorKey: (category: ICategory) => (
            <div className="flex items-center gap-2">
               <CategoryDialog mode="edit" category={category}>
                  <Button variant="ghost" size="icon">
                     <Edit2 className="h-4 w-4" />
                  </Button>
               </CategoryDialog>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>
                           Tem certeza que deseja excluir esta categoria?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                           Esta ação não pode ser desfeita. Isso excluirá
                           permanentemente a categoria e removerá os dados do
                           servidor.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                           onClick={() => handleDelete(category.id)}
                        >
                           Continuar
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
            </div>
         ),
      },
   ];

   return (
      <DataTable<ICategory>
         data={data?.categories || []}
         columns={columns}
         pagination={{
            page,
            pageSize: ITENS_PER_PAGE,
            total: data?.total || 0,
         }}
         onPageChange={handlePageChange}
      />
   );
}
