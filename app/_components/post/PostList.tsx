"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import PostListLoading from "../loadings/PostListLoading";
import QueryError from "../errors/QueryError";
import { useToast } from "../ui/use-toast";
import { IPost } from "@/app/api/_services/modules/post/entities/Post";
import { Column, DataTable } from "../shared/DataTable";
import { Button } from "../ui/button";

const PAGE_SIZE = 10;

export function PostList() {
   const [page, setPage] = useState(1);
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const { data, isLoading, error, refetch } = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
         const response = await fetch("/api/posts");

         if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
         }

         return response.json();
      },
   });

   const { mutate: deletePost } = useMutation({
      mutationFn: async (id: string) => {
         const response = await fetch(`/api/posts?id=${id}`);

         if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
         }
         return response.json();
      },
      onSuccess: () => {
         toast({
            title: "Post excluído com sucesso!",
            description: "O post foi removido do sistema.",
         });
         queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: () => {
         toast({
            title: "Erro ao excluir post",
            description: "Ocorreu um erro ao tentar excluir o post.",
            variant: "destructive",
         });
      },
   });

   const handleDelete = async (id: string) => {
      try {
         await deletePost(id);
         refetch();
      } catch (error) {
         toast({
            title: "Erro ao excluir",
            description: "Ocorreu um erro ao tentar excluir o post.",
            variant: "destructive",
         });
      }
   };

   if (isLoading) return <PostListLoading />;

   if (error) return <QueryError onRetry={() => refetch()} />;

   const columns: Column<IPost>[] = [
      {
         header: "Título",
         accessorKey: (post: IPost) => post.title,
      },
      {
         header: "Categoria",
         accessorKey: (post: IPost) =>
            post.categories?.map((cat) => cat.name).join(", ") ||
            "Sem categoria",
      },
      {
         header: "Visualizações",
         accessorKey: (post: IPost) => post.views,
         className: "text-right",
      },
      {
         header: "Data",
         accessorKey: (post: IPost) =>
            format(new Date(post.createdAt), "dd 'de' MMMM 'de' yyyy", {
               locale: ptBR,
            }),
      },
      {
         header: "Ações",
         accessorKey: (post: IPost) => (
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" asChild>
                  <Link href={`/dashboard/posts/edit/${post.id}`}>
                     <Edit2 className="h-4 w-4" />
                     <span className="sr-only">Editar post</span>
                  </Link>
               </Button>
               <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleDelete(post.id)}
               >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Excluir post</span>
               </Button>
            </div>
         ),
      },
   ];

   return (
      <DataTable<IPost>
         data={data || []}
         columns={columns}
         pagination={{
            page,
            pageSize: PAGE_SIZE,
            total: data?.length || 0,
         }}
         onPageChange={setPage}
      />
   );
}
