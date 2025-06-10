import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { IPost } from '@/app/api/_services/entities/Post';

interface PostsResponse {
   posts: IPost[];
   total: number;
}

interface UsePostsProps {
   page: number;
   search: string;
   categories: string[];
   sortBy: string;
   limit: number;
   searchParams: { [key: string]: string | string[] | undefined };
}

export function usePosts({
   page,
   search,
   categories,
   sortBy,
   limit,
   searchParams,
}: UsePostsProps) {
   const router = useRouter();

   const {
      data: postsData,
      isLoading,
      error,
      refetch,
   } = useQuery<PostsResponse>({
      queryKey: ['posts', page, search, categories, sortBy],
      queryFn: async () => {
         const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            ...(search && { search }),
            ...(categories.length > 0 && { categories: categories.join(',') }),
            ...(sortBy && { sortBy }),
         });

         const response = await fetch(`/api/posts/page?${params}`);
         if (!response.ok) {
            throw new Error('Erro ao buscar posts');
         }
         return response.json();
      },
   });

   const buildSearchParams = (
      currentParams: { [key: string]: string | string[] | undefined },
      overrides: Record<string, string | string[]>,
   ): URLSearchParams => {
      const newParams = new URLSearchParams();

      // Adiciona todos os valores atuais
      Object.entries(currentParams).forEach(([key, value]) => {
         if (Array.isArray(value)) {
            if (value.length > 0) {
               newParams.set(key, value.join(','));
            }
         } else if (value !== undefined) {
            newParams.set(key, value);
         }
      });

      // Aplica substituições
      Object.entries(overrides).forEach(([key, value]) => {
         if (Array.isArray(value)) {
            if (value.length > 0) {
               newParams.set(key, value.join(','));
            } else {
               newParams.delete(key);
            }
         } else if (value) {
            newParams.set(key, value);
         } else {
            newParams.delete(key);
         }
      });

      return newParams;
   };

   const updateURL = useCallback(
      (params: Record<string, string | string[]>) => {
         const newParams = buildSearchParams(searchParams, params);

         // Se não estiver atualizando "page", resetar para 1
         if (!('page' in params)) {
            newParams.set('page', '1');
         }

         router.push(`/posts?${newParams.toString()}`);
      },
      [router, searchParams],
   );

   const getPageUrl = (pageNumber: number) => {
      const newParams = buildSearchParams(searchParams, {
         page: String(pageNumber),
      });
      return `/posts?${newParams.toString()}`;
   };

   const handleApplyFilters = (filters: {
      search: string;
      categories: string[];
      sortBy: string;
   }) => {
      updateURL(filters);
   };

   const handleResetFilters = () => {
      router.push('/posts');
   };

   return {
      postsData,
      isLoading,
      error,
      refetch,
      handleApplyFilters,
      handleResetFilters,
      getPageUrl,
   };
}
