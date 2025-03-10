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
import { LoadingOnePost } from "@/components/loadings/posts/LoadingOnePost";

export default function PostPage({ params }: { params: { id: string } }) {
   const { data: post, isLoading } = useQuery({
      queryKey: ["post", params.id],
      queryFn: () => apiManager.post.findById(params.id),
   });

   if (!post) {
      return null;
   }

   if (isLoading) {
      return <LoadingOnePost />;
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
                        src={"/placeholder-avatar.jpg"}
                        alt={post.author?.name || ""}
                     />
                     <AvatarFallback>
                        {post.author?.name?.charAt(0).toUpperCase() || "A"}
                     </AvatarFallback>
                  </Avatar>
                  <div>
                     <p className="font-medium">{post.author?.name}</p>
                     <p className="text-sm text-muted-foreground">
                        Criado em:{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                     </p>
                  </div>
               </div>

               <div className="flex flex-wrap gap-2 mb-8">
                  {post.categories?.map((category) => (
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

               <Card className="p-6 mb-8">
                  <p className="text-lg text-muted-foreground">
                     {post.description}
                  </p>
               </Card>

               <div
                  className="prose dark:prose-invert max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: post.content }}
               />

               <Separator className="my-8" />

               <CommentSection postId={post.id} />
            </article>
         </div>
      </BaseLayout>
   );
}
