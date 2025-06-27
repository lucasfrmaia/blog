import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import CommentSectionLoading from '../loadings/CommentSectionLoading';
import QueryError from '../errors/QueryError';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { Card, CardContent } from '../ui/card';
import { IComment } from '@/app/api/_services/entities/comment';
import { useEffect } from 'react';

interface CommentSectionProps {
   postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
   const { data: session } = useSession();

   const {
      data: comments,
      isLoading,
      error,
      refetch,
   } = useQuery<IComment[]>({
      queryKey: ['comments', postId],
      queryFn: async () => {
         const response = await fetch(
            `${process.env.API_URL}/comments/post/${postId}`,
         );
         if (!response.ok) {
            throw new Error('Erro ao buscar comentários');
         }
         return response.json();
      },
   });

   if (isLoading) return <CommentSectionLoading />;

   if (error) return <QueryError onRetry={() => refetch()} />;

   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-bold">
            Comentários ({comments?.length || 0})
         </h2>

         {session ? (
            <CommentForm postId={postId} onCommentSubmitted={refetch} />
         ) : (
            <Card>
               <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                     Faça login para comentar neste post.
                  </p>
               </CardContent>
            </Card>
         )}

         <CommentList
            postId={postId}
            comments={comments || []}
            onReplySubmitted={refetch}
         />
      </div>
   );
}
