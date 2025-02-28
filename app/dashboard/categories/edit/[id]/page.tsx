"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { apiManager } from "@/services/modules/ApiManager";
import CategoryForm from "@/components/category/CategoryForm";
import {
   ICategory,
   ICategoryUpdate,
} from "@/services/modules/category/entities/category";

interface EditCategoryPageProps {
   params: {
      id: string;
   };
}

interface FormValues {
   name: string;
   color: string;
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
   const router = useRouter();
   const { toast } = useToast();
   const [isLoading, setIsLoading] = useState(false);

   const { data: category } = useQuery({
      queryKey: ["category", params.id],
      queryFn: () => apiManager.category.findById(params.id),
   });

   const handleSubmit = async (values: FormValues) => {
      if (!category) return;
      setIsLoading(true);

      try {
         const updateData: ICategoryUpdate = {
            id: category.id,
            name: values.name,
            color: values.color,
         };

         await apiManager.category.update(updateData);
         router.push("/dashboard/categories");
         toast({
            title: "Categoria atualizada",
            description: "A categoria foi atualizada com sucesso.",
         });
      } catch (error) {
         toast({
            title: "Erro ao atualizar categoria",
            description: "Ocorreu um erro ao atualizar a categoria.",
            variant: "destructive",
         });
      } finally {
         setIsLoading(false);
      }
   };

   if (!category) {
      return <div>Carregando...</div>;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
         >
            <div className="flex items-center gap-4 mb-8">
               <Button variant="ghost" size="icon" asChild>
                  <Link href="/dashboard/categories">
                     <ArrowLeft className="h-4 w-4" />
                     <span className="sr-only">Voltar</span>
                  </Link>
               </Button>
               <div>
                  <h1 className="text-3xl font-bold">Editar Categoria</h1>
                  <p className="text-muted-foreground">
                     Edite as informações da categoria
                  </p>
               </div>
            </div>

            <CategoryForm
               defaultValues={category}
               isLoading={isLoading}
               onSubmit={handleSubmit}
            />
         </motion.div>
      </div>
   );
}
