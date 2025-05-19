"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Ban, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import PostListLoading from "../loadings/PostListLoading";
import QueryError from "../errors/QueryError";
import { useToast } from "../ui/use-toast";
import { IPost } from "@/app/api/_services/modules/post/entities/Post";
import { Column, DataTable } from "../shared/DataTable";
import { Button } from "../ui/button";
import { PostDialog } from "./dialogs/PostDialog";
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
         const response = await fetch(`/api/posts/${id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Erro deletar o post");
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
         accessorKey: (post: IPost) => {
            return (
               <div className="flex gap-x-2 text-primary">
                  {post.categories?.length !== 0 ? (
                     post?.categories?.map((category) => {
                        return (
                           <Badge
                              style={{ backgroundColor: category.color }}
                              className={`text-primary`}
                           >
                              {category.name}
                           </Badge>
                        );
                     })
                  ) : (
                     <span>Sem Categoria</span>
                  )}
               </div>
            );
         },
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
               <PostDialog post={post} mode="edit">
                  <Button variant="ghost" size="icon">
                     <Edit2 className="h-4 w-4" />
                     <span className="sr-only">Editar post</span>
                  </Button>
               </PostDialog>

               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                     >
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>Ecluir Post</AlertDialogTitle>
                        <AlertDialogDescription>
                           Tem certeza que deseja ecluir o post {post.title}?
                           Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                           onClick={() => handleDelete(post.id)}
                           className="bg-destructive hover:bg-destructive/90"
                        >
                           Excluir
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
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
