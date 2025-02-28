"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { DataTable, Column } from "@/components/shared/DataTable";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IUser } from "@/services/modules/user/entities/user";
import { IRole } from "@/services/modules/user/entities/user";

const PAGE_SIZE = 10;

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
      accessorKey: (user: IUser) =>
         user.role?.map((r: IRole) => r.name).join(", ") || "Usuário",
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
];

export function UserList() {
   const [page, setPage] = useState(1);

   const { data, isLoading } = useQuery({
      queryKey: ["users", page],
      queryFn: () => apiManager.user.findPerPage(page, PAGE_SIZE),
   });

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
