"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Edit, Ban } from "lucide-react";
import Link from "next/link";
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
import { Button } from "../ui/button";
import { IUser } from "@/app/api/_services/modules/user/entities/user";
import { Column, DataTable } from "../shared/DataTable";
import { useToast } from "../ui/use-toast";

const PAGE_SIZE = 10;

export function UserList() {
   const [page, setPage] = useState(1);
   const { toast } = useToast();
   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

   const { data, isLoading, refetch } = useQuery({
      queryKey: ["users", page],
      queryFn: async () => {
         const response = await fetch(
            `/api/users?page=${page}&limit=${PAGE_SIZE}`
         );
         if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
         }
         return response.json();
      },
   });

   const handleBanUser = async (user: IUser) => {
      try {
         const response = await fetch(`/api/users?id=${user.id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Erro ao banir usuário");
         }

         toast({
            title: "Usuário banido",
            description: `O usuário ${user.name} foi banido com sucesso.`,
         });

         refetch();
      } catch (error) {
         toast({
            title: "Erro ao banir usuário",
            description: "Ocorreu um erro ao tentar banir o usuário.",
            variant: "destructive",
         });
      }
   };

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
         accessorKey: (user: IUser) => user.role?.name || "Usuário",
      },
      {
         header: "Membro desde",
         accessorKey: (user: IUser) =>
            format(new Date(user.createdAt), "dd 'de' MMMM 'de' yyyy", {
               locale: ptBR,
            }),
      },
      {
         header: "Posts",
         accessorKey: (user: IUser) => user.posts?.length || 0,
         className: "text-right",
      },
      {
         header: "Ações",
         accessorKey: (user: IUser) => (
            <div className="flex items-center gap-2 justify-end">
               <Button asChild size="sm" variant="ghost">
                  <Link href={`/dashboard/users/edit/${user.id}`}>
                     <Edit className="h-4 w-4" />
                  </Link>
               </Button>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setSelectedUser(user)}
                     >
                        <Ban className="h-4 w-4" />
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>Banir Usuário</AlertDialogTitle>
                        <AlertDialogDescription>
                           Tem certeza que deseja banir o usuário {user.name}?
                           Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                           onClick={() => handleBanUser(user)}
                           className="bg-destructive hover:bg-destructive/90"
                        >
                           Banir
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
            </div>
         ),
      },
   ];

   if (isLoading) {
      return <div>Carregando...</div>;
   }

   return (
      <DataTable<IUser>
         data={data?.users || []}
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
