import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import {
   ThumbsUp,
   ThumbsDown,
   MoreVertical,
   Trash2Icon,
   Edit2Icon,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CommentForm } from "./CommentForm";
import { IComment } from "@/app/api/_services/modules/comment/entities/comment";
import { ADMIN_ROLE_ID } from "@/utils/constantes/constants";

interface CommentCardProps {
   comment: IComment;
   isReply?: boolean;
   postId: string;
   onReply?: () => void;
}

export function CommentCard({
   comment,
   onReply,
   isReply = false,
   postId,
}: CommentCardProps) {
   const { data: session } = useSession();
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const [likes, setLikes] = useState(0);
   const [dislikes, setDislikes] = useState(0);
   const [likeStatus, setLikeStatus] = useState<"like" | "dislike" | null>(
      null
   );
   const [isEditing, setIsEditing] = useState(false);

   const canEdit = session?.user?.id === comment.user?.id;
   const canDelete = canEdit || session?.user?.role === ADMIN_ROLE_ID;

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

   const handleLike = (type: "like" | "dislike") => {
      if (!likeStatus) {
         type === "like" ? setLikes((l) => l + 1) : setDislikes((d) => d + 1);
         setLikeStatus(type);
         return;
      }

      if (type === "like" && likeStatus === "dislike") {
         setLikes((l) => l + 1);
         setDislikes((d) => d - 1);
         setLikeStatus("like");
      } else if (type === "dislike" && likeStatus === "like") {
         setDislikes((d) => d + 1);
         setLikes((l) => l - 1);
         setLikeStatus("dislike");
      } else {
         type === "like" ? setLikes((l) => l - 1) : setDislikes((d) => d - 1);
         setLikeStatus(null);
      }
   };

   if (isEditing) {
      return (
         <div className="ml-1">
            <CommentForm
               postId={postId}
               commentId={comment.id}
               initialContent={comment.content}
               isEditing
               onCancel={() => setIsEditing(false)}
               onCommentSubmitted={() => {
                  setIsEditing(false);
                  queryClient.invalidateQueries({
                     queryKey: ["comments", postId],
                  });
               }}
            />
         </div>
      );
   }

   return (
      <Card>
         <CardContent className="p-4">
            <div className="flex items-start space-x-4">
               <Avatar>
                  <AvatarImage
                     src={comment.user?.image || "/placeholder.jpg"}
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
                     {canDelete && (
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                 <MoreVertical className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              {canEdit && (
                                 <DropdownMenuItem
                                    onClick={() => setIsEditing(true)}
                                 >
                                    <Edit2Icon className="w-4 h-4 mr-2" />{" "}
                                    Editar
                                 </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={handleDelete}>
                                 <Trash2Icon className="w-4 h-4 mr-2" /> Deletar
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     )}
                  </div>
                  <p className="">{comment.content}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                     <button
                        className="flex items-center gap-x-2"
                        onClick={() => handleLike("like")}
                     >
                        <ThumbsUp className="w-4 h-4" /> {likes}
                     </button>
                     <button
                        className="flex items-center gap-x-2"
                        onClick={() => handleLike("dislike")}
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
