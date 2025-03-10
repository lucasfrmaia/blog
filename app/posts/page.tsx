"use client";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { apiManager } from "@/services/modules/ApiManager";
import BaseLayout from "@/components/layout/BaseLayout";
import PostFilters from "@/components/post/PostFilters";
import PostGrid from "@/components/post/PostGrid";
import { motion } from "framer-motion";
import { LoadingPosts } from "@/components/loadings/posts/LoadingPosts";
import QueryError from "@/components/errors/QueryError";
import Pagination from "@/components/shared/Pagination";

const ITEMS_PER_PAGE = 9;

export default function PostsPage() {
   const router = useRouter();
   const searchParams = useSearchParams();

   // Obter parâmetros da URL
   const page = Number(searchParams.get("page")) || 1;
   const search = searchParams.get("search") || "";
   const categories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];
   const sortBy = searchParams.get("sortBy") || "recent";

   // Queries
   const { data: allCategories } = useQuery({
      queryKey: ["categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   const {
      data: posts,
      isLoading,
      error,
      refetch,
   } = useQuery({
      queryKey: ["posts", page, search, categories, sortBy],
      queryFn: async () => {
         let filteredPosts = await apiManager.post.findAll();

         // Filtrar por busca
         if (search) {
            filteredPosts = filteredPosts.filter(
               (post) =>
                  post.title.toLowerCase().includes(search.toLowerCase()) ||
                  post.description.toLowerCase().includes(search.toLowerCase())
            );
         }

         // Filtrar por categorias
         if (categories.length > 0) {
            filteredPosts = filteredPosts.filter((post) =>
               post.categories?.some((category) =>
                  categories.includes(category.id)
               )
            );
         }

         // Ordenar posts
         switch (sortBy) {
            case "oldest":
               filteredPosts.sort(
                  (a, b) =>
                     new Date(a.createdAt).getTime() -
                     new Date(b.createdAt).getTime()
               );
               break;
            case "popular":
               filteredPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
               break;
            default: // recent
               filteredPosts.sort(
                  (a, b) =>
                     new Date(b.createdAt).getTime() -
                     new Date(a.createdAt).getTime()
               );
         }

         return filteredPosts;
      },
   });

   // Paginação
   const totalPosts = posts?.length || 0;
   const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);
   const paginatedPosts = posts?.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
   );

   // Handlers
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

         // Resetar página ao aplicar novos filtros
         if (Object.keys(params).some((key) => key !== "page")) {
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

   const handlePageChange = (newPage: number) => {
      updateURL({ page: String(newPage) });
   };

   if (isLoading) {
      return <LoadingPosts />;
   }

   if (error) {
      return <QueryError onRetry={() => refetch()} />;
   }

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <div className="mb-12">
                  <h1 className="text-4xl text-center font-bold">Blog</h1>
                  <p className="text-muted-foreground text-center mt-2">
                     Explore nossos posts mais recentes
                  </p>
               </div>

               <PostFilters
                  initialSearch={search}
                  initialCategories={categories}
                  initialSortBy={sortBy}
                  categories={allCategories}
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
               />

               <div className="mt-8">
                  {paginatedPosts?.length ? (
                     <>
                        <PostGrid posts={paginatedPosts} />
                        {totalPages > 1 && (
                           <div className="mt-8">
                              <Pagination
                                 currentPage={page}
                                 totalPages={totalPages}
                                 onPageChange={handlePageChange}
                              />
                           </div>
                        )}
                     </>
                  ) : (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                     >
                        <p className="text-lg text-muted-foreground">
                           Nenhum post encontrado com os filtros selecionados.
                        </p>
                     </motion.div>
                  )}
               </div>
            </motion.div>
         </div>
      </BaseLayout>
   );
}
