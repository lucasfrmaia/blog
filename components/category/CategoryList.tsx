"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ICategory } from "@/services/modules/category/entities/category";

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

export function CategoryList() {
   const [page, setPage] = useState(1);
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const { data, isLoading } = useQuery({
      queryKey: ["categories", page],
      queryFn: () => apiManager.category.findPerPage(page, PAGE_SIZE),
   });

   const { mutate: deleteCategory } = useMutation({
      mutationFn: (id: string) => apiManager.category.delete(id),
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

   if (isLoading) {
      return <div>Carregando...</div>;
   }

   return (
      <DataTable<ICategory>
         data={data?.categories || []}
         columns={columns}
         pagination={{
            page,
            pageSize: PAGE_SIZE,
            total: data?.total || 0,
         }}
         onPageChange={setPage}
      />
   );
}
