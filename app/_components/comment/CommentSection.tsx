import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import CommentSectionLoading from "../loadings/CommentSectionLoading";
import QueryError from "../errors/QueryError";
import { AuthUser } from "@/utils/types/auth";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { Card, CardContent } from "../ui/card";
import { IComment } from "@/app/api/_services/modules/comment/entities/comment";

interface CommentSectionProps {
   postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
   const { data: session } = useSession();
   const user = session?.user as AuthUser | undefined;

   const {
      data: comments,
      isLoading,
      error,
      refetch,
   } = useQuery<IComment[]>({
      queryKey: ["comments", postId],
      queryFn: async () => {
         const response = await fetch(`/api/comments/post/${postId}`);
         if (!response.ok) {
            throw new Error("Erro ao buscar comentários");
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

         {user ? (
            <CommentForm
               postId={postId}
               user={user}
               onCommentSubmitted={refetch}
            />
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
            onReplySubmitted={() => {}}
            comments={comments || []}
         />
      </div>
   );
}
