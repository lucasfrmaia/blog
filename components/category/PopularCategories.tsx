"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { apiManager } from "@/services/modules/ApiManager";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ICategory } from "@/services/modules/category/entities/category";

export default function PopularCategories() {
   const { data: categories, isLoading } = useQuery<ICategory[]>({
      queryKey: ["popular_categories"],
      queryFn: async () => {
         const response = await apiManager.category.findPopularCategories(6);
         return response;
      },
   });

   if (isLoading) {
      return null;
   }

   return (
      <section className="py-16">
         <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
               <div>
                  <h2 className="text-3xl font-bold">Categorias Populares</h2>
                  <p className="text-muted-foreground mt-2">
                     Explore os tópicos mais discutidos em nosso blog
                  </p>
               </div>
               <Button asChild>
                  <Link href="/categories" className="inline-flex items-center">
                     Ver Todas
                     <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
               </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
               {categories?.map((category, index) => (
                  <motion.div
                     key={category.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                     }}
                  >
                     <Link
                        href={`/categories/${category.id}`}
                        className="block"
                     >
                        <div
                           className="relative h-32 rounded-lg overflow-hidden group hover:shadow-lg transition-all"
                           style={{ backgroundColor: category.color }}
                        >
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                 <h3 className="text-white font-semibold text-lg">
                                    {category.name}
                                 </h3>
                                 <p className="text-white/80 text-sm">
                                    {category.posts?.length || 0} posts
                                 </p>
                              </div>
                           </div>
                        </div>
                     </Link>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
}
