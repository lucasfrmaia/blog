"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { apiManager } from "@/services/modules/ApiManager";
import BaseLayout from "@/components/layout/BaseLayout";
import { ICategory } from "@/services/modules/category/entities/category";

export default function CategoriesPage() {
   const { data: categories, isLoading } = useQuery<ICategory[]>({
      queryKey: ["all_categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   if (isLoading) {
      return (
         <BaseLayout>
            <div>Carregando...</div>
         </BaseLayout>
      );
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
                  <h1 className="text-4xl font-bold">Todas as Categorias</h1>
                  <p className="text-muted-foreground mt-2">
                     Explore todos os tópicos disponíveis em nosso blog
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                              className="relative h-48 rounded-lg overflow-hidden group hover:shadow-lg transition-all"
                              style={{ backgroundColor: category.color }}
                           >
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="text-center">
                                    <h2 className="text-white font-semibold text-2xl">
                                       {category.name}
                                    </h2>
                                    <p className="text-white/80 mt-2">
                                       {category.posts?.length || 0} posts
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </Link>
                     </motion.div>
                  ))}
               </div>
            </motion.div>
         </div>
      </BaseLayout>
   );
}
