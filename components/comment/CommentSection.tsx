import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import CommentSectionLoading from "../loadings/CommentSectionLoading";
import QueryError from "../errors/QueryError";
import { AuthUser } from "@/utils/types/auth";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

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
   } = useQuery({
      queryKey: ["comments", postId],
      queryFn: () => apiManager.comment.findByPostId(postId),
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

         <CommentList comments={comments || []} />
      </div>
   );
}
