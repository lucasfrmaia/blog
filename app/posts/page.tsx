"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import QueryError from "../_components/errors/QueryError";
import BaseLayout from "../_components/layout/BaseLayout";
import { LoadingPosts } from "../_components/loadings/posts/LoadingPosts";
import PostFilters from "../_components/post/PostFilters";
import PostGrid from "../_components/post/PostGrid";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { IPost } from "@/app/api/_services/modules/post/entities/Post";
import { ITENS_PER_PAGE } from "@/utils/constantes/constants";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { Button } from "@/app/_components/ui/button";

interface PostsResponse {
   posts: IPost[];
   total: number;
}

export default function PostsPage({
   searchParams,
}: {
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const router = useRouter();
   const page = Number(searchParams?.page) || 1;
   const search = (searchParams?.search as string) || "";
   const categories =
      (searchParams?.categories as string)?.split(",").filter(Boolean) || [];
   const sortBy = (searchParams?.sortBy as string) || "recent";

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
      data: postsData,
      isLoading,
      error,
      refetch,
   } = useQuery<PostsResponse>({
      queryKey: ["posts", page, search, categories, sortBy],
      queryFn: async () => {
         const params = new URLSearchParams({
            page: String(page),
            limit: String(ITENS_PER_PAGE),
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

   const totalPages = Math.ceil((postsData?.total || 0) / ITENS_PER_PAGE);

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

   const getPageUrl = (pageNumber: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(pageNumber));
      return `/posts?${params.toString()}`;
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
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
               />

               <div className="mt-10">
                  {postsData?.posts?.length ? (
                     <>
                        <PostGrid posts={postsData.posts} />
                        {totalPages > 1 && (
                           <div className="mt-8 flex justify-center">
                              <Pagination>
                                 <PaginationContent>
                                    <PaginationItem>
                                       <Link
                                          href={getPageUrl(
                                             Math.max(1, page - 1)
                                          )}
                                       >
                                          <Button
                                             variant="outline"
                                             disabled={page === 1}
                                          >
                                             <PaginationPrevious />
                                          </Button>
                                       </Link>
                                    </PaginationItem>

                                    {Array.from(
                                       { length: totalPages },
                                       (_, i) => i + 1
                                    ).map((pageNumber) => {
                                       // Mostrar primeira página, última página, página atual e uma página antes e depois da atual
                                       if (
                                          pageNumber === 1 ||
                                          pageNumber === totalPages ||
                                          (pageNumber >= page - 1 &&
                                             pageNumber <= page + 1)
                                       ) {
                                          return (
                                             <PaginationItem key={pageNumber}>
                                                <Link
                                                   href={getPageUrl(pageNumber)}
                                                >
                                                   <Button
                                                      variant={
                                                         pageNumber === page
                                                            ? "default"
                                                            : "outline"
                                                      }
                                                   >
                                                      {pageNumber}
                                                   </Button>
                                                </Link>
                                             </PaginationItem>
                                          );
                                       }

                                       // Mostrar reticências depois da primeira página e antes da última
                                       if (
                                          (pageNumber === 2 && page > 3) ||
                                          (pageNumber === totalPages - 1 &&
                                             page < totalPages - 2)
                                       ) {
                                          return (
                                             <PaginationItem key={pageNumber}>
                                                <PaginationEllipsis />
                                             </PaginationItem>
                                          );
                                       }

                                       return null;
                                    })}

                                    <PaginationItem>
                                       <Link
                                          href={getPageUrl(
                                             Math.min(totalPages, page + 1)
                                          )}
                                       >
                                          <Button
                                             variant="outline"
                                             disabled={page >= totalPages}
                                          >
                                             <PaginationNext />
                                          </Button>
                                       </Link>
                                    </PaginationItem>
                                 </PaginationContent>
                              </Pagination>
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
