"use client";

import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import BaseLayout from "@/components/layout/BaseLayout";
import { apiManager } from "@/services/modules/ApiManager";
import PostFilters from "@/components/post/PostFilters";
import PostGrid from "@/components/post/PostGrid";
import Pagination from "@/components/shared/Pagination";

const ITEMS_PER_PAGE = 9;

export default function BlogPage() {
   const router = useRouter();
   const searchParams = useSearchParams();

   // URL State
   const page = Number(searchParams.get("page")) || 1;
   const search = searchParams.get("search") || "";
   const category = searchParams.get("category") || "";
   const sortBy = searchParams.get("sortBy") || "recent";

   // Queries
   const { data: categories } = useQuery({
      queryKey: ["categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   const { data: posts, isLoading: isLoadingPosts } = useQuery({
      queryKey: ["posts", page, search, category, sortBy],
      queryFn: async () => {
         const response = await apiManager.post.findAll(100);
         return response;
      },
   });

   // Filtered and Sorted Posts
   const filteredPosts = useMemo(() => {
      if (!posts) return [];

      let filtered = [...posts];

      if (search) {
         const searchLower = search.toLowerCase();
         filtered = filtered.filter(
            (post) =>
               post.title.toLowerCase().includes(searchLower) ||
               post.description.toLowerCase().includes(searchLower)
         );
      }

      if (category) {
         filtered = filtered.filter((post) =>
            post.categories.some((cat) => cat.slug === category)
         );
      }

      if (sortBy === "popular") {
         filtered.sort((a, b) => b.views - a.views);
      } else {
         filtered.sort(
            (a, b) =>
               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
         );
      }

      return filtered;
   }, [posts, search, category, sortBy]);

   // Pagination
   const paginatedPosts = useMemo(() => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return filteredPosts.slice(start, end);
   }, [filteredPosts, page]);

   const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

   // URL State Update
   const updateQuery = useCallback(
      (updates: Record<string, string>) => {
         const params = new URLSearchParams(searchParams.toString());
         Object.entries(updates).forEach(([key, value]) => {
            if (value) {
               params.set(key, value);
            } else {
               params.delete(key);
            }
         });
         router.push(`/blog?${params.toString()}`);
      },
      [router, searchParams]
   );

   // Loading State
   if (isLoadingPosts) {
      return (
         <BaseLayout>
            <div className="container mx-auto px-4 py-8">
               <div className="animate-pulse space-y-8">
                  <div className="h-12 bg-muted rounded-lg w-full max-w-md" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {Array.from({ length: 6 }).map((_, index) => (
                        <div
                           key={index}
                           className="space-y-4 rounded-lg border p-4"
                        >
                           <div className="h-48 bg-muted rounded-lg" />
                           <div className="space-y-2">
                              <div className="h-6 bg-muted rounded w-3/4" />
                              <div className="h-4 bg-muted rounded w-full" />
                              <div className="h-4 bg-muted rounded w-2/3" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </BaseLayout>
      );
   }

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="text-center mb-12"
            >
               <h1 className="text-4xl font-bold mb-4">Blog</h1>
               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore nossos artigos sobre desenvolvimento, tecnologia e
                  programação
               </p>
            </motion.div>

            {/* Filters */}
            <PostFilters
               search={search}
               category={category}
               sortBy={sortBy}
               categories={categories}
               onUpdateFilters={updateQuery}
            />

            {/* Posts Grid */}
            {paginatedPosts.length > 0 ? (
               <PostGrid posts={paginatedPosts} />
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

            {/* Pagination */}
            {totalPages > 1 && (
               <div className="mt-12">
                  <Pagination
                     currentPage={page}
                     totalPages={totalPages}
                     onPageChange={(newPage) =>
                        updateQuery({ page: String(newPage) })
                     }
                  />
               </div>
            )}
         </div>
      </BaseLayout>
   );
}
