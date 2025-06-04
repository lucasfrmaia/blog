import { IComment } from "@/app/api/_services/modules/comment/entities/comment";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";
import {
   ThumbsDown,
   ThumbsUp,
   ChevronDown,
   ChevronUp,
   MoreVertical,
   TreesIcon,
   Trash2Icon,
} from "lucide-react";
import { CommentForm } from "./CommentForm";
import { useSession } from "next-auth/react";
import { ROUTES_PAGE } from "@/utils/constantes/routes";
import { useRouter } from "next/navigation";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useToast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ADMIN_ROLE_ID } from "@/utils/constantes/constants";

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

   const topLevelComments = comments.filter((c) => !c.parent_id);
   const repliesMap = comments.reduce<Record<string, IComment[]>>(
      (acc, comment) => {
         if (comment.parent_id) {
            acc[comment.parent_id] = acc[comment.parent_id] || [];
            acc[comment.parent_id].push(comment);
         }
         return acc;
      },
      {}
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
                           {isExpanded ? "Ocultar" : "Ver"} {replies.length}{" "}
                           {replies.length === 1 ? "resposta" : "respostas"}
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

function CommentCard({
   comment,
   onReply,
   isReply = false,
   postId,
}: {
   comment: IComment;
   onReply?: () => void;
   isReply?: boolean;
   postId: string;
}) {
   const queryClient = useQueryClient();
   const { data: session } = useSession();
   console.log(session);
   const { toast } = useToast();
   const [likes, setLikes] = useState(0);
   const [dislikes, setDislikes] = useState(0);
   const [isLikeOrDeslike, setLikeOrDeslike] = useState<
      "like" | "deslike" | null
   >(null);

   const handleDelete = async () => {
      try {
         const response = await fetch(`/api/comments/${comment.id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erro ao deletar comentário");
         }

         toast({
            title: "Comentário deletado",
            description: "O comentário foi deletado com sucesso",
         });

         queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      } catch (error) {
         toast({
            title: "Erro ao deletar comentário",
            description: (error as Error).message,
            variant: "destructive",
         });
      }
   };

   const canDeleteComment =
      session?.user?.id === comment.user?.id ||
      session?.user?.role === ADMIN_ROLE_ID;

   const handleLike = (typeLike: "like" | "deslike") => {
      if (!isLikeOrDeslike) {
         if (typeLike == "like") {
            setLikes((like) => like + 1);
            setLikeOrDeslike("like");
         } else {
            setDislikes((deslike) => deslike + 1);
            setLikeOrDeslike("deslike");
         }

         return;
      }

      if (typeLike == "like" && isLikeOrDeslike == "deslike") {
         setLikes((like) => like + 1);
         setDislikes((deslike) => deslike - 1);
         setLikeOrDeslike("like");
      } else if (typeLike == "deslike" && isLikeOrDeslike == "like") {
         setLikes((like) => like - 1);
         setDislikes((deslike) => deslike + 1);
         setLikeOrDeslike("deslike");
      } else if (typeLike == "like") {
         setLikes((like) => like - 1);
         setLikeOrDeslike(null);
      } else {
         setDislikes((deslike) => deslike - 1);
         setLikeOrDeslike(null);
      }
   };

   return (
      <Card>
         <CardContent className="p-4">
            <div className="flex items-start space-x-4">
               <Avatar>
                  <AvatarImage
                     src={comment.user?.image || "/placeholder-avatar.jpg"}
                     alt={comment.user?.name || ""}
                  />
                  <AvatarFallback>
                     {comment.user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                  </AvatarFallback>
               </Avatar>
               <div className="flex-1">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-x-2">
                        <p className="font-medium">{comment.user?.name}</p>
                        <p className="text-sm text-muted-foreground">
                           {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                              locale: ptBR,
                           })}
                        </p>
                     </div>

                     {canDeleteComment && (
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                 <MoreVertical className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                 className="text-primary"
                                 onClick={handleDelete}
                              >
                                 <span className="flex items-center gap-x-2 text-primary">
                                    <Trash2Icon className="w-6 h-6" /> Deletar
                                 </span>
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     )}
                  </div>
                  <p className="mt-2">{comment.content}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                     <button
                        className="flex items-center gap-x-2"
                        onClick={() => handleLike("like")}
                     >
                        <ThumbsUp className="w-4 h-4" /> {likes}
                     </button>
                     <button
                        className="flex items-center gap-x-2"
                        onClick={() => handleLike("deslike")}
                     >
                        <ThumbsDown className="h-4 w-4" /> {dislikes}
                     </button>
                     {onReply && <button onClick={onReply}>Responder</button>}
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
