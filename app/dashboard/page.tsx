"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   BarChart3,
   Eye,
   FileText,
   MessageSquare,
   Plus,
   TrendingUp,
   Users,
} from "lucide-react";
import Link from "next/link";
import { apiManager } from "@/services/modules/ApiManager";
import BaseLayout from "@/components/layout/BaseLayout";
import { UserList } from "@/components/user/UserList";
import { CategoryList } from "@/components/category/CategoryList";
import { PostList } from "@/components/post/PostList";

export default function DashboardPage() {
   const { data: posts, isLoading: isLoadingPosts } = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
         const response = await apiManager.post.findAll();
         return response;
      },
   });

   const { data: categories, isLoading: isLoadingCategories } = useQuery({
      queryKey: ["categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   if (isLoadingPosts || isLoadingCategories) {
      return null;
   }

   const totalViews = posts?.reduce((acc, post) => acc + post.views, 0) || 0;
   const totalComments =
      posts?.reduce((acc, post) => acc + (post.comments?.length || 0), 0) || 0;

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            {/* Stats */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium">
                        Total de Posts
                     </CardTitle>
                     <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">
                        {posts?.length || 0}
                     </div>
                     <p className="text-xs text-muted-foreground">
                        Posts publicados
                     </p>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium">
                        Visualizações
                     </CardTitle>
                     <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{totalViews}</div>
                     <p className="text-xs text-muted-foreground">
                        Total de visualizações
                     </p>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium">
                        Comentários
                     </CardTitle>
                     <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{totalComments}</div>
                     <p className="text-xs text-muted-foreground">
                        Total de comentários
                     </p>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium">
                        Taxa de Engajamento
                     </CardTitle>
                     <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">
                        {posts && posts.length > 0
                           ? `${(
                                ((totalViews + totalComments) /
                                   (posts.length * 100)) *
                                100
                             ).toFixed(1)}%`
                           : "0%"}
                     </div>
                     <p className="text-xs text-muted-foreground">
                        Média por post
                     </p>
                  </CardContent>
               </Card>
            </motion.div>

            {/* Posts Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="mb-8"
            >
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                     <div>
                        <CardTitle>Posts</CardTitle>
                        <CardDescription>
                           Gerencie os posts do blog
                        </CardDescription>
                     </div>
                     <Button asChild>
                        <Link href="/dashboard/posts/create">
                           <Plus className="mr-2 h-4 w-4" />
                           Novo Post
                        </Link>
                     </Button>
                  </CardHeader>
                  <CardContent>
                     <PostList />
                  </CardContent>
               </Card>
            </motion.div>

            {/* Categories Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.6 }}
               className="mb-8"
            >
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                     <div>
                        <CardTitle>Categorias</CardTitle>
                        <CardDescription>
                           Gerencie as categorias do blog
                        </CardDescription>
                     </div>
                     <Button asChild>
                        <Link href="/dashboard/categories/create">
                           <Plus className="mr-2 h-4 w-4" />
                           Nova Categoria
                        </Link>
                     </Button>
                  </CardHeader>
                  <CardContent>
                     <CategoryList />
                  </CardContent>
               </Card>
            </motion.div>

            {/* Users Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.4 }}
               className="mb-8"
            >
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                     <div>
                        <CardTitle>Usuários</CardTitle>
                        <CardDescription>
                           Gerencie os usuários do sistema
                        </CardDescription>
                     </div>
                     <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <UserList />
                  </CardContent>
               </Card>
            </motion.div>

            {/* Performance Chart */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.8 }}
            >
               <Card>
                  <CardHeader>
                     <CardTitle>Desempenho</CardTitle>
                     <CardDescription>
                        Visualizações e comentários nos últimos 30 dias
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                        <BarChart3 className="h-8 w-8" />
                        <span className="ml-2">Gráfico de desempenho</span>
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </BaseLayout>
   );
}
