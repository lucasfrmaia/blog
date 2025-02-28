"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { toast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserForm from "@/components/forms/UserForm";
import { IUserUpdate } from "@/services/modules/user/entities/user";

interface EditUserPageProps {
   params: {
      id: string;
   };
}

export default function EditUserPage({ params }: EditUserPageProps) {
   const router = useRouter();

   const { data: user, isLoading } = useQuery({
      queryKey: ["user", params.id],
      queryFn: () => apiManager.user.findById(params.id),
   });

   const { mutateAsync: updateUser, isPending } = useMutation({
      mutationFn: (data: IUserUpdate) => apiManager.user.update(data),
      onSuccess: () => {
         toast({
            title: "Usuário atualizado com sucesso!",
            description: "As informações do usuário foram atualizadas.",
         });
         router.push("/dashboard");
      },
      onError: () => {
         toast({
            title: "Erro ao atualizar usuário",
            description: "Ocorreu um erro ao tentar atualizar o usuário.",
            variant: "destructive",
         });
      },
   });

   if (isLoading) {
      return null;
   }

   if (!user) {
      return <div>Usuário não encontrado</div>;
   }

   return (
      <DashboardLayout>
         <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
               <h1 className="text-3xl font-bold mb-8">Editar Usuário</h1>
               <UserForm
                  defaultValues={user}
                  isSubmitting={isPending}
                  onSubmit={updateUser}
               />
            </div>
         </div>
      </DashboardLayout>
   );
}
