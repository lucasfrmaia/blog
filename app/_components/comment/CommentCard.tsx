import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import {
   ThumbsUp,
   ThumbsDown,
   MoreVertical,
   Trash2Icon,
   Edit2Icon,
} from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CommentForm } from './CommentForm';
import { ADMIN_ROLE_ID } from '@/utils/constantes/constants';
import { IComment, ITypeLike } from '@/app/api/_services/entities/comment';

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

   const [reaction, setReaction] = useState({
      likes: comment.likesCount,
      deslikes: comment.deslikesCount,
      userReaction:
         comment?.likes?.find((like) => like.userId === session?.user?.id)
            ?.type ?? null,
   });

   const [isEditing, setIsEditing] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);

   const canEdit = session?.user?.id === comment.user?.id;
   const canDelete = canEdit || session?.user?.role === ADMIN_ROLE_ID;

   const handleDelete = async () => {
      try {
         const response = await fetch(
            `${process.env.API_URL}/comments/${comment.id}`,
            {
               method: 'DELETE',
            },
         );

         if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao deletar comentário');
         }

         toast({
            title: 'Comentário deletado',
            description: 'O comentário foi deletado com sucesso',
         });

         queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      } catch (error) {
         toast({
            title: 'Erro ao deletar comentário',
            description: (error as Error).message,
            variant: 'destructive',
         });
      }
   };

   const handleLike = async (type: ITypeLike) => {
      if (isProcessing || !session?.user?.id) return;

      setIsProcessing(true);

      try {
         const response = await fetch(
            `${process.env.API_URL}/comments/reaction/${comment.id}`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  userId: session.user.id,
                  reaction: type,
               }),
            },
         );

         if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao registrar reação');
         }

         const data = await response.json();

         setReaction({
            likes: data.likes,
            deslikes: data.deslikes,
            userReaction:
               reaction.userReaction === type
                  ? null
                  : (type as 'like' | 'deslike'),
         });
      } catch (error) {
         toast({
            title: 'Erro ao reagir',
            description: (error as Error).message,
            variant: 'destructive',
         });
      } finally {
         setIsProcessing(false);
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
                     queryKey: ['comments', postId],
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
               <Avatar className="mt-2 h-12 w-12">
                  <AvatarImage
                     src={comment.user?.avatar || '/placeholder.jpg'}
                     alt={comment.user?.name || ''}
                  />
                  <AvatarFallback>
                     {comment.user?.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || 'U'}
                  </AvatarFallback>
               </Avatar>
               <div className="flex-1">
                  <div className="flex items-center justify-between  md:mb-[0.2rem]">
                     <div className="flex items-end gap-x-1">
                        <p className="font-medium">{comment.user?.name}</p>
                        <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
                           {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                              locale: ptBR,
                           })}
                        </p>
                        {comment.edited && (
                           <p className="text-sm text-muted-foreground">
                              (editado)
                           </p>
                        )}
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
                                    <Edit2Icon className="w-4 h-4 mr-2" />
                                    Editar
                                 </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={handleDelete}>
                                 <Trash2Icon className="w-4 h-4 mr-2" />
                                 Deletar
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     )}
                  </div>
                  <p className="">{comment.content}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                     <button
                        className={`flex items-center gap-x-2 ${
                           reaction.userReaction === 'like'
                              ? 'text-blue-500'
                              : ''
                        }`}
                        disabled={isProcessing}
                        onClick={() => handleLike('like')}
                     >
                        <ThumbsUp className="w-4 h-4" /> {reaction.likes}
                     </button>
                     <button
                        className={`flex items-center gap-x-2 ${
                           reaction.userReaction === 'deslike'
                              ? 'text-red-500'
                              : ''
                        }`}
                        disabled={isProcessing}
                        onClick={() => handleLike('deslike')}
                     >
                        <ThumbsDown className="h-4 w-4" /> {reaction.deslikes}
                     </button>
                     {onReply && <button onClick={onReply}>Responder</button>}
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
