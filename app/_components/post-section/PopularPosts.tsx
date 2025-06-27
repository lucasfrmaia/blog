'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import {
   PostContainer,
   PostImage,
   PostContent,
   PostTitle,
   PostCategories,
   PostDescription,
   PostReadMoreButton,
   PostCategoriesBadge,
} from '../post-component/PostComponent';
import { AMOUNT_POST_RECENT } from '@/utils/constantes/constants';
import TitleSection from '../ui/utils/TitleSection';
import { IPost } from '@/app/api/_services/entities/Post';

interface IPopularPostsProps {
   children?: React.ReactNode;
   className?: string;
   // Outras props aqui
}

const PopularPosts: React.FC<IPopularPostsProps> = ({
   children,
   className = '',
   // Outras props aqui
}) => {
   const { data: posts, isLoading } = useQuery<IPost[]>({
      queryKey: ['popular_posts'],
      queryFn: async () => {
         const response = await fetch(`${process.env.API_URL}/posts/popular`);
         if (!response.ok) {
            throw new Error('Erro ao buscar posts populares');
         }
         return response.json();
      },
   });

   if (posts == null || isLoading) {
      return null;
   }

   return (
      <div className={className}>
         <article className={className}>
            <h4 className="text-muted-foreground">Oque está em alta</h4>
            <TitleSection>Posts Populares</TitleSection>

            <div>
               {posts.map((post) => {
                  return (
                     <PostContainer
                        className="mb-4"
                        key={`RecentPost-${post.id}`}
                     >
                        <PostContent>
                           <PostTitle post={post} />
                           <PostCategoriesBadge post={post} />
                           <PostDescription post={post} />
                        </PostContent>
                     </PostContainer>
                  );
               })}
            </div>
         </article>
      </div>
   );
};

export default PopularPosts;
