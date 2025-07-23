'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import BaseLayout from '../_components/layout/BaseLayout';
import { PostList } from '../_components/post/PostList';
import { Button } from '../_components/ui/button';
import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
   CardDescription,
} from '../_components/ui/card';
import { UserList } from '../_components/user/UserList';
import { apiManager } from '../api/_services/ApiManager';
import {
   Eye,
   FileText,
   MessageSquare,
   Plus,
   TrendingUp,
   Users,
} from 'lucide-react';
import Link from 'next/link';
import CategoryList from '../_components/category/CategoryList';
import { CategoryDialog } from '../_components/category/dialogs/CategoryDialog';
import { PostDialog } from '../_components/post/dialogs/PostDialog';
import { useState } from 'react';
import { IPostStatistics } from '../api/_services/entities/Post';

export default function DashboardPage() {
   const [currentPagePost, setCurrentPagePost] = useState(1);

   const { data: statistics, isLoading: isLoadingPosts } =
      useQuery<IPostStatistics>({
         queryKey: ['posts', 'statistics'],
         queryFn: async () => {
            const response = await fetch(
               `${process.env.API_URL}/posts/statistics`,
            );
            if (!response.ok) {
               throw new Error('Erro ao buscar posts');
            }
            return response.json();
         },
      });

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
                        {statistics?.totalPosts}
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
                     <div className="text-2xl font-bold">
                        {statistics?.totalViews}
                     </div>
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
                     <div className="text-2xl font-bold">
                        {statistics?.totalComments}
                     </div>
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
                        {statistics?.engagement}
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
                     <PostDialog currentPage={currentPagePost} mode="create">
                        <Button>
                           <Plus className="mr-2 h-4 w-4" />
                           Novo Post
                        </Button>
                     </PostDialog>
                  </CardHeader>
                  <CardContent>
                     <PostList
                        currentPage={currentPagePost}
                        setCurrentPage={setCurrentPagePost}
                     />
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
                     <CategoryDialog mode="create">
                        <Button>
                           <Plus className="mr-2 h-4 w-4" />
                           Nova Categoria
                        </Button>
                     </CategoryDialog>
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
         </div>
      </BaseLayout>
   );
}
