'use client';

import { CategoryBadge } from '@/app/_components/category/CategoryBadge';
import CommentSection from '@/app/_components/comment/CommentSection';
import BaseLayout from '@/app/_components/layout/BaseLayout';
import { LoadingOnePostSkeleton } from '@/app/_components/loadings/posts/LoadingOnePost';
import { Card } from '@/app/_components/ui/card';
import { Separator } from '@/app/_components/ui/separator';
import { IPost } from '@/app/api/_services/entities/Post';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Share1Icon } from '@radix-ui/react-icons';

import { useQuery } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';

export default function PostPage({ params }: { params: { id: string } }) {
   const { data: post, isLoading } = useQuery<IPost>({
      queryKey: ['post', params.id],
      queryFn: async () => {
         const response = await fetch(
            `${process.env.API_URL}/posts/${params.id}`,
         );
         if (!response.ok) {
            throw new Error('Erro ao buscar categorias');
         }
         return response.json();
      },
   });

   const handleFavorite = () => {};

   if (isLoading) {
      return <LoadingOnePostSkeleton />;
   }

   if (!post) {
      return <p>Post Não Encontrado</p>;
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

               <div className="flex items-center justify-between mb-8">
                  <div className="">
                     <div className="flex items-center space-x-4 mb-2">
                        <Avatar>
                           <AvatarImage
                              src={'/placeholder-avatar.jpg'}
                              alt={post.author?.name || ''}
                           />
                           <AvatarFallback>
                              {post.author?.name?.charAt(0).toUpperCase() ||
                                 'A'}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                           <p className="font-medium">{post.author?.name}</p>
                           <p className="text-sm text-muted-foreground">
                              Criado em:{' '}
                              {new Date(post.createdAt).toLocaleDateString()}
                           </p>
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-2">
                        {post.categories?.map((category) => (
                           <CategoryBadge
                              key={`page-${category.id}-${post.id}`}
                              category={category}
                           />
                        ))}
                     </div>
                  </div>
               </div>

               <Card className="p-6 mb-8">
                  <p className="text-lg text-muted-foreground">
                     {post.description}
                  </p>
               </Card>

               <div
                  className="prose dark:prose-invert max-w-none mb-14"
                  dangerouslySetInnerHTML={{ __html: post.content }}
               />

               <Separator className="my-8" />

               <CommentSection postId={post.id} />
            </article>
         </div>
      </BaseLayout>
   );
}
