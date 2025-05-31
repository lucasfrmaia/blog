import { IComment } from "@/app/api/_services/modules/comment/entities/comment";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";
import { CommentReplyForm } from "./CommentReplyForm";
import { ThumbsDown, ThumbsUp } from "lucide-react";

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
   const [replyTo, setReplyTo] = useState<string | null>(null);

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

   return (
      <div className="space-y-4">
         {topLevelComments.map((comment) => (
            <div key={comment.id}>
               <CommentCard
                  comment={comment}
                  onReply={() => setReplyTo(comment.id)}
               />
               {replyTo === comment.id && (
                  <div className="ml-12 mt-2">
                     <CommentReplyForm
                        postId={postId}
                        parentId={comment.id}
                        onCancel={() => setReplyTo(null)}
                        onSubmitted={() => {
                           setReplyTo(null);
                           onReplySubmitted();
                        }}
                     />
                  </div>
               )}
               {(repliesMap[comment.id] || []).map((reply) => (
                  <div key={reply.id} className="ml-12 mt-2">
                     <CommentCard comment={reply} isReply />
                  </div>
               ))}
            </div>
         ))}
      </div>
   );
}

function CommentCard({
   comment,
   onReply,
   isReply = false,
}: {
   comment: IComment;
   onReply?: () => void;
   isReply?: boolean;
}) {
   const [likes, setLikes] = useState(0);
   const [dislikes, setDislikes] = useState(0);
   const [isLikeOrDeslike, setLikeOrDeslike] = useState<
      "like" | "deslike" | null
   >(null);

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
                     src="/placeholder-avatar.jpg"
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
                     <p className="font-medium">{comment.user?.name}</p>
                     <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                           addSuffix: true,
                           locale: ptBR,
                        })}
                     </p>
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
