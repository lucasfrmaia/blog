"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { DataTable, Column } from "@/components/shared/DataTable";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IPost } from "@/services/modules/post/entities/Post";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import PostListLoading from "../loadings/PostListLoading";
import QueryError from "../errors/QueryError";

const PAGE_SIZE = 10;

export function PostList() {
   const [page, setPage] = useState(1);
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const { data, isLoading, error, refetch } = useQuery({
      queryKey: ["posts"],
      queryFn: () => apiManager.post.findAll(),
   });

   const { mutate: deletePost } = useMutation({
      mutationFn: (id: string) => apiManager.post.delete(id),
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
