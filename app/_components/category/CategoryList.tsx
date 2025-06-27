'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Edit2, Trash2 } from 'lucide-react';
import CategoryListLoading from '../loadings/CategoryListLoading';
import QueryError from '../errors/QueryError';
import { useToast } from '../ui/use-toast';
import { ICategory } from '@/app/api/_services/entities/category';
import { Column, DataTable } from '../shared/DataTable';
import { Button } from '../ui/button';
import { CategoryDialog } from './dialogs/CategoryDialog';
import { Badge } from '../ui/badge';
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
} from '../ui/alert-dialog';
import { ITENS_PER_PAGE_TABLE } from '@/utils/constantes/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryBadge } from './CategoryBadge';

export default function CategoryList() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const [currentPage, setCurrentPage] = useState(1);

   const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['categories', currentPage],
      queryFn: async () => {
         const params = new URLSearchParams({
            page: currentPage.toString(),
            limit: ITENS_PER_PAGE_TABLE.toString(),
         });

         const response = await fetch(
            `${process.env.API_URL}/categories/page?${params}`,
         );

         if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.message || 'Erro Desconhecido');
         }

         return response.json();
      },
   });

   const { mutate: deleteCategory } = useMutation({
      mutationFn: async (id: string) => {
         const response = await fetch(
            `${process.env.API_URL}/categories/${id}`,
            {
               method: 'DELETE',
            },
         );

         if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.message || 'Erro Desconhecido');
         }
         return response.json();
      },
      onSuccess: () => {
         toast({
            title: 'Categoria excluída com sucesso!',
            description: 'A categoria foi removida do sistema.',
         });
         queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
      onError: (error) => {
         toast({
            title: 'Erro ao excluir categoria',
            description:
               'Ocorreu um erro ao tentar excluir a categoria: ' +
               error.message,
            variant: 'destructive',
         });
      },
   });

   const handleDelete = async (id: string) => {
      deleteCategory(id);
      refetch();
   };

   const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
   };

   if (isLoading) return <CategoryListLoading />;

   if (error) return <QueryError onRetry={() => refetch()} />;

   const columns: Column<ICategory>[] = [
      {
         header: 'ID',
         accessorKey: (category: ICategory) => category.id,
      },
      {
         header: 'Nome',
         accessorKey: (category: ICategory) => category.name,
      },
      {
         header: 'Cor',
         accessorKey: (category: ICategory) => (
            <CategoryBadge category={category} />
         ),
      },
      {
         header: 'Posts',
         accessorKey: (category: ICategory) => category.posts?.length || 0,
         className: 'text-right',
      },
      {
         header: 'Data',
         accessorKey: (category: ICategory) => {
            return <div>{new Date(category.createdAt).toDateString()}</div>;
         },
      },
      {
         header: 'Ações',
         accessorKey: (category: ICategory) => (
            <div className="flex items-center gap-2">
               <CategoryDialog
                  currentPage={currentPage}
                  mode="edit"
                  category={category}
               >
                  <Button variant="ghost" size="icon">
                     <Edit2 className="h-4 w-4" />
                  </Button>
               </CategoryDialog>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>
                           Tem certeza que deseja excluir esta categoria?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                           Esta ação não pode ser desfeita. Isso excluirá
                           permanentemente a categoria e removerá os dados do
                           servidor.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                           onClick={() => handleDelete(category.id)}
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
      <DataTable<ICategory>
         data={data?.categories || []}
         columns={columns}
         pagination={{
            page: currentPage,
            pageSize: ITENS_PER_PAGE_TABLE,
            total: data?.total || 0,
         }}
         onPageChange={handlePageChange}
      />
   );
}
