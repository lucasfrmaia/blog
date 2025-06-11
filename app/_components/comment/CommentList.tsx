import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CommentForm } from './CommentForm';
import { useSession } from 'next-auth/react';
import { ROUTES_PAGE } from '@/utils/constantes/routes';
import { useRouter } from 'next/navigation';
import { CommentCard } from './CommentCard';
import { IComment } from '@/app/api/_services/entities/comment';

interface CommentListProps {
   postId: string;
   comments: IComment[];
   onReplySubmitted: () => void;
}

export function CommentList({
   comments,
   onReplySubmitted,
   postId,
}: CommentListProps) {
   const { data: session } = useSession();
   const router = useRouter();
   const [replyTo, replyTof] = useState<string | null>(null);
   const [expandedComments, setExpandedComments] = useState<
      Record<string, boolean>
   >({});

   const setReplyTo = (id: string | null) => {
      if (!session) {
         router.replace(ROUTES_PAGE.login.link);
         return;
      }

      replyTof(id);
   };

   const topLevelComments = comments.filter((c) => !c.parentId);
   const repliesMap = comments.reduce<Record<string, IComment[]>>(
      (acc, comment) => {
         if (comment.parentId) {
            acc[comment.parentId] = acc[comment.parentId] || [];
            acc[comment.parentId].push(comment);
         }
         return acc;
      },
      {},
   );

   const toggleReplies = (commentId: string) => {
      setExpandedComments((prev) => ({
         ...prev,
         [commentId]: !prev[commentId],
      }));
   };

   return (
      <div className="space-y-4">
         {topLevelComments.map((comment) => {
            const replies = repliesMap[comment.id] || [];
            const hasReplies = replies.length > 0;
            const isExpanded = expandedComments[comment.id];

            return (
               <div key={comment.id}>
                  <CommentCard
                     postId={postId}
                     comment={comment}
                     onReply={() => setReplyTo(comment.id)}
                  />
                  {replyTo === comment.id && (
                     <div className="ml-12 mt-2">
                        <CommentForm
                           postId={postId}
                           parentId={comment.id}
                           replyToUser={comment.user?.name}
                           onCancel={() => setReplyTo(null)}
                           onCommentSubmitted={() => {
                              setReplyTo(null);
                              onReplySubmitted();
                           }}
                        />
                     </div>
                  )}
                  {hasReplies && (
                     <div className="ml-12 mt-2">
                        <Button
                           variant="ghost"
                           className="flex items-center gap-2 text-sm text-muted-foreground"
                           onClick={() => toggleReplies(comment.id)}
                        >
                           {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                           ) : (
                              <ChevronDown className="h-4 w-4" />
                           )}
                           {isExpanded ? 'Ocultar' : 'Ver'} {replies.length}{' '}
                           {replies.length === 1 ? 'resposta' : 'respostas'}
                        </Button>
                     </div>
                  )}
                  {isExpanded && hasReplies && (
                     <div className="ml-12 space-y-2 mt-2">
                        {replies.map((reply) => (
                           <div key={reply.id}>
                              <CommentCard
                                 postId={postId}
                                 comment={reply}
                                 isReply
                                 onReply={() => setReplyTo(reply.id)}
                              />
                              {replyTo === reply.id && (
                                 <div className="ml-12 mt-2">
                                    <CommentForm
                                       postId={postId}
                                       parentId={comment.id}
                                       replyToUser={reply.user?.name}
                                       onCancel={() => setReplyTo(null)}
                                       onCommentSubmitted={() => {
                                          setReplyTo(null);
                                          onReplySubmitted();
                                       }}
                                    />
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            );
         })}
      </div>
   );
}
