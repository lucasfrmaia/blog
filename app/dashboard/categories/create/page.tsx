"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { apiManager } from "@/services/modules/ApiManager";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryForm from "@/components/forms/CategoryForm";
import { ICreateCategoryDTO } from "@/services/modules/category/dtos/create-category.dto";

export default function CreateCategoryPage() {
   const router = useRouter();

   const { mutateAsync: createCategory, isPending } = useMutation({
      mutationFn: (data: ICreateCategoryDTO) =>
         apiManager.category.create(data),
      onSuccess: () => {
         toast({
            title: "Categoria criada com sucesso!",
            description: "A categoria foi adicionada ao sistema.",
         });
         router.push("/dashboard/categories");
      },
      onError: () => {
         toast({
            title: "Erro ao criar categoria",
            description: "Ocorreu um erro ao tentar criar a categoria.",
            variant: "destructive",
         });
      },
   });

   return (
      <DashboardLayout>
         <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
               <h1 className="text-3xl font-bold mb-8">Criar Nova Categoria</h1>
               <CategoryForm
                  onSubmit={createCategory}
                  isSubmitting={isPending}
               />
            </div>
         </div>
      </DashboardLayout>
   );
}
