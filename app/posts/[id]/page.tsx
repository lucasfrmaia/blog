"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BaseLayout from "@/components/layout/BaseLayout";
import CommentSection from "@/components/comment/CommentSection";

export default function PostPage({ params }: { params: { id: string } }) {
   const { data: post, isLoading } = useQuery({
      queryKey: ["post", params.id],
      queryFn: () => apiManager.post.findById(params.id),
   });

   if (isLoading || !post) {
      return (
         <BaseLayout>
            <div className="container mx-auto px-4 py-8">
               <div>Carregando...</div>
            </div>
         </BaseLayout>
      );
   }

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            <article className="max-w-4xl mx-auto">
               {post.img && (
                  <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                     <img
                        src={post.img}
                        alt={post.title}
                        className="object-cover w-full h-full"
                     />
                  </div>
               )}

               <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

               <div className="flex items-center space-x-4 mb-8">
                  <Avatar>
                     <AvatarImage
                        src={post.author?.image || "/placeholder-avatar.jpg"}
                        alt={post.author?.name || ""}
                     />
                     <AvatarFallback>
                        {post.author?.name
                           ?.split(" ")
                           .map((n) => n[0])
                           .join("")
                           .toUpperCase() || "AU"}
                     </AvatarFallback>
                  </Avatar>
                  <div>
                     <p className="font-medium">{post.author?.name}</p>
                     <p className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                     </p>
                  </div>
               </div>

               <div className="flex flex-wrap gap-2 mb-8">
                  {post.category?.map((category) => (
                     <Badge
                        key={category.id}
                        variant="secondary"
                        style={{
                           backgroundColor: category.color,
                           color: "white",
                        }}
                     >
                        {category.name}
                     </Badge>
                  ))}
               </div>

               <div
                  className="prose dark:prose-invert max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: post.content }}
               />

               <div className="flex items-center justify-between py-4">
                  <div className="flex space-x-4">
                     <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Curtir
                     </Button>
                     <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comentar
                     </Button>
                     <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartilhar
                     </Button>
                  </div>
               </div>

               <Separator className="my-8" />

               <CommentSection postId={post.id} />
            </article>
         </div>
      </BaseLayout>
   );
}
