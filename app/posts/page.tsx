"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import QueryError from "../_components/errors/QueryError";
import BaseLayout from "../_components/layout/BaseLayout";
import { LoadingPosts } from "../_components/loadings/posts/LoadingPosts";
import PostFilters from "../_components/post/PostFilters";
import PostGrid from "../_components/post/PostGrid";
import Pagination from "../_components/shared/Pagination";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { IPost } from "@/app/api/_services/modules/post/entities/Post";

const ITEMS_PER_PAGE = 9;

export default function PostsPage({
   searchParams,
}: {
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const router = useRouter();
   const page = Number(searchParams?.page) || 1;
   const search = (searchParams?.search as string) || "";
   const categories = (searchParams?.categories as string)?.split(",") || [];
   const sortBy = (searchParams?.sortBy as string) || "recent";

   const [currentPage, setCurrentPage] = useState(page);

   // Queries
   const { data: categoriesData } = useQuery<ICategory[]>({
      queryKey: ["categories"],
      queryFn: async () => {
         const response = await fetch("/api/categories");
         if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
         }
         return response.json();
      },
   });

   const {
      data: posts,
      isLoading,
      error,
      refetch,
   } = useQuery<IPost[]>({
      queryKey: ["posts"],
      queryFn: async () => {
         const response = await fetch("/api/posts");
         if (!response.ok) {
            throw new Error("Erro ao buscar posts");
         }
         return response.json();
      },
   });

   // Calcular posts paginados
   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
   const endIndex = startIndex + ITEMS_PER_PAGE;
   const paginatedPosts = posts?.slice(startIndex, endIndex) || [];
   const totalPages = Math.ceil((posts?.length || 0) / ITEMS_PER_PAGE);

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
                  categories={categoriesData}
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
               />

               <div className="mt-8">
                  {paginatedPosts?.length ? (
                     <>
                        <PostGrid posts={paginatedPosts} />
                        {totalPages > 1 && (
                           <div className="mt-8 flex justify-center">
                              <Pagination
                                 currentPage={currentPage}
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
