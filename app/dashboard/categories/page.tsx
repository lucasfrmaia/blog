"use client";

import { BackDashboard } from "@/app/_components/buttons/BackDashboard";
import { Button } from "@/app/_components/ui/button";
import {
   TableHeader,
   TableRow,
   TableHead,
   TableBody,
   TableCell,
} from "@/app/_components/ui/table";
import { useToast } from "@/app/_components/ui/use-toast";
import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link, Plus, Table, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CategoriesPage() {
   const { toast } = useToast();
   const [isDeleting, setIsDeleting] = useState(false);

   const { data: categories, refetch } = useQuery<ICategory[]>({
      queryKey: ["all_categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   const handleDelete = async (id: string) => {
      if (isDeleting) return;

      try {
         setIsDeleting(true);
         await apiManager.category.delete(id);
         await refetch();
         toast({
            title: "Categoria excluída",
            description: "A categoria foi excluída com sucesso.",
         });
      } catch (error) {
         toast({
            title: "Erro ao excluir categoria",
            description: "Ocorreu um erro ao excluir a categoria.",
            variant: "destructive",
         });
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <div className="container mx-auto px-4 py-8">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-4">
                  <BackDashboard />
                  <div>
                     <h1 className="text-3xl font-bold">Categorias</h1>
                     <p className="text-muted-foreground">
                        Gerencie as categorias do blog
                     </p>
                  </div>
               </div>
               <Button asChild>
                  <Link
                     href="/dashboard/categories/create"
                     className="inline-flex items-center"
                  >
                     <Plus className="mr-2 h-4 w-4" />
                     Nova Categoria
                  </Link>
               </Button>
            </div>

            <div className="rounded-md border">
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cor</TableHead>
                        <TableHead>Posts</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {categories?.map((category) => (
                        <TableRow key={category.id}>
                           <TableCell>{category.name}</TableCell>
                           <TableCell>
                              <div className="flex items-center gap-2">
                                 <div
                                    className="w-6 h-6 rounded"
                                    style={{
                                       backgroundColor: category.color,
                                    }}
                                 />
                                 {category.color}
                              </div>
                           </TableCell>
                           <TableCell>
                              {category.posts?.length || 0} posts
                           </TableCell>
                           <TableCell>
                              <div className="flex items-center gap-2">
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
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                    <span className="sr-only">
                                       Excluir categoria
                                    </span>
                                 </Button>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         </motion.div>
      </div>
   );
}
