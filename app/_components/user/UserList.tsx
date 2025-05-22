"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit2, Trash2 } from "lucide-react";
import UserListLoading from "../loadings/UserListLoading";
import QueryError from "../errors/QueryError";
import { useToast } from "../ui/use-toast";
import { IUser } from "@/app/api/_services/modules/user/entities/user";
import { Column, DataTable } from "../shared/DataTable";
import { Button } from "../ui/button";
import { UserDialog } from "./dialogs/UserDialog";
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

export function UserList() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const page = Number(searchParams?.get("page")) || 1;

   const { data, isLoading, error, refetch } = useQuery({
      queryKey: ["users", page],
      queryFn: async () => {
         const params = new URLSearchParams({
            page: page.toString(),
            limit: ITENS_PER_PAGE.toString(),
         });

         const response = await fetch(`/api/users/page?${params}`);

         if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
         }

         return response.json();
      },
   });

   const { mutate: deleteUser } = useMutation({
      mutationFn: async (id: string) => {
         const response = await fetch(`/api/users/${id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Erro ao deletar usuário");
         }
         return response.json();
      },
      onSuccess: () => {
         toast({
            title: "Usuário excluído com sucesso!",
            description: "O usuário foi removido do sistema.",
         });
         queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: () => {
         toast({
            title: "Erro ao excluir usuário",
            description: "Ocorreu um erro ao tentar excluir o usuário.",
            variant: "destructive",
         });
      },
   });

   const handleDelete = async (id: string) => {
      try {
         await deleteUser(id);
         refetch();
      } catch (error) {
         toast({
            title: "Erro ao excluir",
            description: "Ocorreu um erro ao tentar excluir o usuário.",
            variant: "destructive",
         });
      }
   };

   const handlePageChange = (newPage: number) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
   };

   if (isLoading) return <UserListLoading />;

   if (error) return <QueryError onRetry={() => refetch()} />;

   const columns: Column<IUser>[] = [
      {
         header: "Nome",
         accessorKey: (user: IUser) => user.name,
      },
      {
         header: "Email",
         accessorKey: (user: IUser) => user.email,
      },
      {
         header: "Função",
         accessorKey: (user: IUser) => user.role?.name || "Sem função",
      },
      {
         header: "Posts",
         accessorKey: (user: IUser) => user.posts?.length || 0,
         className: "text-right",
      },
      {
         header: "Data",
         accessorKey: (user: IUser) =>
            format(new Date(user.createdAt), "dd 'de' MMMM 'de' yyyy", {
               locale: ptBR,
            }),
      },
      {
         header: "Ações",
         accessorKey: (user: IUser) => (
            <div className="flex items-center gap-2">
               <UserDialog mode="edit" user={user}>
                  <Button variant="ghost" size="icon">
                     <Edit2 className="h-4 w-4" />
                  </Button>
               </UserDialog>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>
                           Tem certeza que deseja excluir este usuário?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                           Esta ação não pode ser desfeita. Isso excluirá
                           permanentemente o usuário e removerá os dados do
                           servidor.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                           onClick={() => handleDelete(user.id)}
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
      <DataTable<IUser>
         data={data?.users || []}
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
