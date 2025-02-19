"use client";

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
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   BarChart3,
   Edit,
   Eye,
   FileText,
   MessageSquare,
   Plus,
   Trash2,
   TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";

export default function DashboardPage() {
   const { data: posts, isLoading } = useQuery({
      queryKey: ["posts"],
      queryFn: () => apiManager.post.findAll(),
   });

   if (isLoading) {
      return null;
   }

   const totalViews = posts?.reduce((acc, post) => acc + post.views, 0) || 0;
   const totalComments =
      posts?.reduce((acc, post) => acc + (post.comments?.length || 0), 0) || 0;

   return (
      <div className="container mx-auto px-4 py-8">
         {/* Header */}
         <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-3xl font-bold">Dashboard</h1>
               <p className="text-muted-foreground">
                  Gerencie seus posts e monitore o desempenho
               </p>
            </div>
            <Button asChild>
               <Link href="/dashboard/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Post
               </Link>
            </Button>
         </div>

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
                  <div className="text-2xl font-bold">{posts?.length || 0}</div>
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
                        ? \`\${(
                             ((totalViews + totalComments) /
                                (posts.length * 100)) *
                             100
                          ).toFixed(1)}%\`
                        : "0%"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Média por post
                  </p>
               </CardContent>
            </Card>
         </motion.div>

         {/* Recent Posts */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
         >
            <Card>
               <CardHeader>
                  <CardTitle>Posts Recentes</CardTitle>
                  <CardDescription>
                     Gerencie seus posts mais recentes
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Título</TableHead>
                           <TableHead>Data</TableHead>
                           <TableHead>Visualizações</TableHead>
                           <TableHead>Comentários</TableHead>
                           <TableHead>Ações</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {posts?.map((post) => (
                           <TableRow key={post.id}>
                              <TableCell className="font-medium">
                                 {post.title}
                              </TableCell>
                              <TableCell>
                                 {new Date(
                                    post.createdAt
                                 ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{post.views}</TableCell>
                              <TableCell>
                                 {post.comments?.length || 0}
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       asChild
                                    >
                                       <Link
                                          href={\`/dashboard/edit/\${post.id}\`}
                                       >
                                          <Edit className="h-4 w-4" />
                                          <span className="sr-only">
                                             Editar post
                                          </span>
                                       </Link>
                                    </Button>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="text-destructive"
                                    >
                                       <Trash2 className="h-4 w-4" />
                                       <span className="sr-only">
                                          Excluir post
                                       </span>
                                    </Button>
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </motion.div>

         {/* Performance Chart */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
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
   );
}
