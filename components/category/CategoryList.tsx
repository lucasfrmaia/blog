"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ICategory } from "@/services/modules/category/entities/category";
import { apiManager } from "@/services/modules/ApiManager";

interface CategoryListProps {
   categories: ICategory[];
}

export default function CategoryList({ categories }: CategoryListProps) {
   const router = useRouter();
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const [isDeleting, setIsDeleting] = useState(false);

   const { mutate: deleteCategory } = useMutation({
      mutationFn: async (id: string) => {
         await apiManager.category.delete(id);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["categories"] });
         toast({
            title: "Categoria excluída",
            description: "A categoria foi excluída com sucesso.",
         });
      },
      onError: () => {
         toast({
            title: "Erro ao excluir categoria",
            description: "Ocorreu um erro ao excluir a categoria.",
            variant: "destructive",
         });
      },
      onSettled: () => {
         setIsDeleting(false);
      },
   });

   const handleDelete = async (id: string) => {
      if (isDeleting) return;
      setIsDeleting(true);
      deleteCategory(id);
   };

   return (
      <div className="rounded-md border">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead>Posts</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {categories.map((category) => (
                  <TableRow key={category.id}>
                     <TableCell>{category.name}</TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2">
                           <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: category.color }}
                           />
                           {category.color}
                        </div>
                     </TableCell>
                     <TableCell>{category.posts?.length || 0}</TableCell>
                     <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                           <Button variant="ghost" size="icon" asChild>
                              <Link
                                 href={`/dashboard/categories/edit/${category.id}`}
                              >
                                 <Edit2 className="h-4 w-4" />
                                 <span className="sr-only">
                                    Editar categoria
                                 </span>
                              </Link>
                           </Button>
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(category.id)}
                              disabled={isDeleting}
                           >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Excluir categoria</span>
                           </Button>
                        </div>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
