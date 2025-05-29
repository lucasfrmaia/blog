import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { IPost } from "@/app/api/_services/modules/post/entities/Post";

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
      queryKey: ["posts", page, search, categories, sortBy],
      queryFn: async () => {
         const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            ...(search && { search }),
            ...(categories.length > 0 && { categories: categories.join(",") }),
            ...(sortBy && { sortBy }),
         });

         const response = await fetch(`/api/posts/page?${params}`);
         if (!response.ok) {
            throw new Error("Erro ao buscar posts");
         }
         return response.json();
      },
   });

   const updateURL = useCallback(
      (params: Record<string, string | string[]>) => {
         const newParams = new URLSearchParams(searchParams.toString());

         Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
               if (value.length > 0) {
                  newParams.set(key, value.join(","));
               } else {
                  newParams.delete(key);
               }
            } else if (value) {
               newParams.set(key, value);
            } else {
               newParams.delete(key);
            }
         });

         // Manter os filtros ao mudar de página
         if (!Object.keys(params).includes("page")) {
            newParams.set("page", "1");
         }

         router.push(`/posts?${newParams.toString()}`);
      },
      [router, searchParams]
   );

   const handleApplyFilters = (filters: {
      search: string;
      categories: string[];
      sortBy: string;
   }) => {
      updateURL(filters);
   };

   const handleResetFilters = () => {
      router.push("/posts");
   };

   const getPageUrl = (pageNumber: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(pageNumber));
      return `/posts?${params.toString()}`;
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
