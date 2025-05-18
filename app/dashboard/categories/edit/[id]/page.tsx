"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import CategoryForm from "../../../../_components/category/CategoryForm";
import DashboardLayout from "../../../../_components/layout/DashboardLayout";
import { useToast } from "../../../../_components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function EditCategoryPage() {
   const params = useParams() as { id: string };
   const router = useRouter();
   const { toast } = useToast();

   const { data: category, isLoading } = useQuery<ICategory>({
      queryKey: ["category", params.id],
      queryFn: async () => {
         const response = await fetch(`/api/categories/${params.id}`);
         if (!response.ok) {
            throw new Error("Erro ao buscar categoria");
         }
         return response.json();
      },
   });

   const handleSubmit = async (values: any) => {
      try {
         const response = await fetch(`/api/categories/${params.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
         });

         if (!response.ok) {
            throw new Error("Erro ao atualizar categoria");
         }

         toast({
            title: "Sucesso",
            description: "Categoria atualizada com sucesso",
         });

         router.push("/dashboard/categories");
      } catch (error) {
         toast({
            title: "Erro",
            description: "Erro ao atualizar categoria",
            variant: "destructive",
         });
      }
   };

   return (
      <DashboardLayout>
         <div className="container mx-auto py-8">
            <h1 className="mb-8 text-3xl font-bold">Editar Categoria</h1>
            <CategoryForm
               defaultValues={category}
               isLoading={isLoading}
               onSubmit={handleSubmit}
            />
         </div>
      </DashboardLayout>
   );
}
