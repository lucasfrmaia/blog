import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CommentSectionProps {
   postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
   const { data: session } = useSession();
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const [comment, setComment] = useState("");

   const { data: comments, isLoading } = useQuery({
      queryKey: ["comments", postId],
      queryFn: () => apiManager.comment.findByPostId(postId),
   });

   const { mutate: createComment, isPending } = useMutation({
      mutationFn: async () => {
         if (!session?.user) throw new Error("Usuário não autenticado");

         await apiManager.comment.create({
            content: comment,
            postId,
            userId: session.user.id,
         });
      },
      onSuccess: () => {
         setComment("");
         queryClient.invalidateQueries({ queryKey: ["comments", postId] });
         toast({
            title: "Comentário adicionado",
            description: "Seu comentário foi publicado com sucesso.",
         });
      },
      onError: () => {
         toast({
            title: "Erro ao comentar",
            description: "Não foi possível publicar seu comentário.",
            variant: "destructive",
         });
      },
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!comment.trim()) return;
      createComment();
   };

   if (isLoading) {
      return (
         <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-bold">
            Comentários ({comments?.length || 0})
         </h2>

         {session ? (
            <form onSubmit={handleSubmit} className="space-y-4">
               <Textarea
                  placeholder="Escreva seu comentário..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
               />
               <Button type="submit" disabled={isPending || !comment.trim()}>
                  {isPending ? (
                     <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Publicando...
                     </>
                  ) : (
                     "Publicar Comentário"
                  )}
               </Button>
            </form>
         ) : (
            <Card>
               <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                     Faça login para comentar neste post.
                  </p>
               </CardContent>
            </Card>
         )}

         <div className="space-y-4">
            {comments?.map((comment) => (
               <Card key={comment.id}>
                  <CardContent className="p-4">
                     <div className="flex items-start space-x-4">
                        <Avatar>
                           <AvatarImage
                              src={
                                 comment.user?.image ||
                                 "/placeholder-avatar.jpg"
                              }
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
                              <p className="font-medium">
                                 {comment.user?.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {formatDistanceToNow(
                                    new Date(comment.createdAt),
                                    {
                                       addSuffix: true,
                                       locale: ptBR,
                                    }
                                 )}
                              </p>
                           </div>
                           <p className="mt-2">{comment.content}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}
