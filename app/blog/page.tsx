"use client";

import { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PostCard from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { apiManager } from "@/services/modules/ApiManager";
import {
   ChevronLeft,
   ChevronRight,
   Filter,
   Search,
   SlidersHorizontal,
} from "lucide-react";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 9;

export default function BlogPage() {
   const router = useRouter();
   const searchParams = useSearchParams();

   const page = Number(searchParams.get("page")) || 1;
   const search = searchParams.get("search") || "";
   const category = searchParams.get("category") || "";
   const sortBy = searchParams.get("sortBy") || "recent";

   const { data: categories } = useQuery({
      queryKey: ["all_categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   const { data: postsData, isLoading } = useQuery({
      queryKey: ["posts", page, search, category, sortBy],
      queryFn: async () => {
         const posts = await apiManager.post.findAll(100); // Simular paginação
         let filtered = posts;

         if (search) {
            filtered = filtered.filter(
               (post) =>
                  post.title.toLowerCase().includes(search.toLowerCase()) ||
                  post.description.toLowerCase().includes(search.toLowerCase())
            );
         }

         if (category) {
            filtered = filtered.filter((post) =>
               post.categories.some((cat) => cat.slug === category)
            );
         }

         if (sortBy === "popular") {
            filtered.sort((a, b) => b.views - a.views);
         } else if (sortBy === "recent") {
            filtered.sort(
               (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
            );
         }

         const total = filtered.length;
         const items = filtered.slice(
            (page - 1) * ITEMS_PER_PAGE,
            page * ITEMS_PER_PAGE
         );

         return {
            items,
            total,
            totalPages: Math.ceil(total / ITEMS_PER_PAGE),
         };
      },
   });

   const updateQuery = useCallback(
      (updates: Record<string, string>) => {
         const params = new URLSearchParams(searchParams);
         Object.entries(updates).forEach(([key, value]) => {
            if (value) {
               params.set(key, value);
            } else {
               params.delete(key);
            }
         });
         router.push(\`/blog?\${params.toString()}\`);
      },
      [router, searchParams]
   );

   const clearFilters = () => {
      router.push("/blog");
   };

   if (isLoading) {
      return null;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
               <h1 className="text-4xl font-bold mb-2">Blog</h1>
               <p className="text-muted-foreground">
                  Explore nossos artigos e tutoriais
               </p>
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4">
               <div className="flex items-center gap-2 bg-card rounded-lg border p-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                     type="search"
                     placeholder="Buscar posts..."
                     className="border-0 focus-visible:ring-0 bg-transparent w-[200px]"
                     value={search}
                     onChange={(e) =>
                        updateQuery({ search: e.target.value, page: "1" })
                     }
                  />
               </div>

               <Select
                  value={category}
                  onValueChange={(value) =>
                     updateQuery({ category: value, page: "1" })
                  }
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="">Todas</SelectItem>
                     {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                           {cat.title}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>

               <Select
                  value={sortBy}
                  onValueChange={(value) =>
                     updateQuery({ sortBy: value, page: "1" })
                  }
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="recent">Mais Recentes</SelectItem>
                     <SelectItem value="popular">Mais Populares</SelectItem>
                  </SelectContent>
               </Select>

               {(search || category || sortBy !== "recent") && (
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={clearFilters}
                     className="h-10"
                  >
                     Limpar Filtros
                  </Button>
               )}
            </div>

            {/* Mobile Filters */}
            <div className="md:hidden w-full">
               <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="outline" className="w-full">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filtros
                     </Button>
                  </SheetTrigger>
                  <SheetContent>
                     <SheetHeader>
                        <SheetTitle>Filtros</SheetTitle>
                        <SheetDescription>
                           Ajuste os filtros para encontrar os posts desejados
                        </SheetDescription>
                     </SheetHeader>
                     <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                           <label className="text-sm font-medium">Buscar</label>
                           <div className="flex items-center gap-2 bg-card rounded-lg border p-2">
                              <Search className="h-4 w-4 text-muted-foreground" />
                              <Input
                                 type="search"
                                 placeholder="Buscar posts..."
                                 className="border-0 focus-visible:ring-0 bg-transparent"
                                 value={search}
                                 onChange={(e) =>
                                    updateQuery({
                                       search: e.target.value,
                                       page: "1",
                                    })
                                 }
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-sm font-medium">Categoria</label>
                           <Select
                              value={category}
                              onValueChange={(value) =>
                                 updateQuery({ category: value, page: "1" })
                              }
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="">Todas</SelectItem>
                                 {categories?.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.slug}>
                                       {cat.title}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="space-y-2">
                           <label className="text-sm font-medium">
                              Ordenar por
                           </label>
                           <Select
                              value={sortBy}
                              onValueChange={(value) =>
                                 updateQuery({ sortBy: value, page: "1" })
                              }
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Ordenar por" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="recent">
                                    Mais Recentes
                                 </SelectItem>
                                 <SelectItem value="popular">
                                    Mais Populares
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        </div>

                        {(search || category || sortBy !== "recent") && (
                           <Button
                              variant="outline"
                              className="w-full"
                              onClick={clearFilters}
                           >
                              Limpar Filtros
                           </Button>
                        )}
                     </div>
                  </SheetContent>
               </Sheet>
            </div>
         </div>

         {/* Active Filters */}
         {(search || category || sortBy !== "recent") && (
            <div className="flex flex-wrap gap-2 mb-6">
               {search && (
                  <Badge variant="secondary" className="text-sm">
                     Busca: {search}
                     <button
                        className="ml-2"
                        onClick={() => updateQuery({ search: "", page: "1" })}
                     >
                        ×
                     </button>
                  </Badge>
               )}
               {category && (
                  <Badge variant="secondary" className="text-sm">
                     Categoria:{" "}
                     {
                        categories?.find((cat) => cat.slug === category)
                           ?.title
                     }
                     <button
                        className="ml-2"
                        onClick={() => updateQuery({ category: "", page: "1" })}
                     >
                        ×
                     </button>
                  </Badge>
               )}
               {sortBy !== "recent" && (
                  <Badge variant="secondary" className="text-sm">
                     Ordenado por: {sortBy === "popular" ? "Populares" : "Recentes"}
                     <button
                        className="ml-2"
                        onClick={() => updateQuery({ sortBy: "recent", page: "1" })}
                     >
                        ×
                     </button>
                  </Badge>
               )}
            </div>
         )}

         {/* Results */}
         <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-6">
               {postsData?.total} posts encontrados
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {postsData?.items.map((post, index) => (
                  <motion.div
                     key={post.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                     }}
                  >
                     <PostCard
                        id={post.id}
                        title={post.title}
                        excerpt={post.description}
                        coverImage={post.img || "/placeholder.jpg"}
                        readTime={`${Math.ceil(
                           post.description.length / 1000
                        )} min de leitura`}
                        category={post.categories[0]?.title || "Geral"}
                        views={post.views}
                     />
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Pagination */}
         {postsData?.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
               <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => updateQuery({ page: String(page - 1) })}
               >
                  <ChevronLeft className="h-4 w-4" />
               </Button>
               {Array.from({ length: postsData.totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                     <Button
                        key={pageNumber}
                        variant={pageNumber === page ? "default" : "outline"}
                        size="icon"
                        onClick={() =>
                           updateQuery({ page: String(pageNumber) })
                        }
                     >
                        {pageNumber}
                     </Button>
                  )
               )}
               <Button
                  variant="outline"
                  size="icon"
                  disabled={page === postsData.totalPages}
                  onClick={() => updateQuery({ page: String(page + 1) })}
               >
                  <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
         )}
      </div>
   );
} 