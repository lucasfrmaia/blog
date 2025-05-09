"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { Button } from "../ui/button";
import PostCard from "../post/PostCard";

export default function PostSection() {
   const { data: posts, isLoading } = useQuery({
      queryKey: ["featured_posts"],
      queryFn: async () => {
         const response = await apiManager.post.findAll();
         return response;
      },
   });

   // Buscar comentários para cada post
   const { data: comments } = useQuery({
      queryKey: ["all_comments"],
      queryFn: async () => {
         const response = await apiManager.comment.findAll();
         return response;
      },
      enabled: !!posts,
   });

   return (
      <section className="py-16 bg-accent/50">
         <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
               <div>
                  <h2 className="text-3xl font-bold">Posts em Destaque</h2>
                  <p className="text-muted-foreground mt-2">
                     Explore nossos artigos mais recentes e populares
                  </p>
               </div>
               <Button asChild>
                  <Link href="/posts" className="inline-flex items-center">
                     Ver Todos
                     <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
               </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {posts?.map((post, index) => {
                  const postComments = comments?.filter(
                     (comment) => comment.postId === post.id
                  );

                  return (
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
                           category={"Geral"}
                           views={post.views}
                           commentsCount={postComments?.length || 0}
                        />
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>
   );
}
