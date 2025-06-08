import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface CommentFormProps {
   postId: string;
   parentId?: string;
   replyToUser?: string;
   commentId?: string;
   initialContent?: string;
   isEditing?: boolean;
   onCommentSubmitted: () => void;
   onCancel?: () => void;
}

export function CommentForm({
   postId,
   parentId,
   replyToUser,
   commentId,
   initialContent = "",
   isEditing = false,
   onCommentSubmitted,
   onCancel,
}: CommentFormProps) {
   const { data: session } = useSession();
   const user = session?.user;

   const { toast } = useToast();
   const [isExpanded, setIsExpanded] = useState(isEditing || !!initialContent);

   const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { isSubmitting },
   } = useForm({
      defaultValues: {
         content: initialContent || "",
      },
   });

   const content = watch("content");

   useEffect(() => {
      if (replyToUser && !content) {
         setValue("content", `@${replyToUser} `);
      }
   }, []);

   const onSubmit = async (data: { content: string }) => {
      try {
         const url = commentId
            ? `/api/comments/${commentId}`
            : "/api/comments/create";

         const method = commentId ? "PATCH" : "POST";

         const response = await fetch(url, {
            method,
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               content: data.content,
               userId: session?.user.id,
               parentId: parentId,
               postId,
            }),
         });

         if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.message || "Erro Desconhecido");
         }

         reset();
         setIsExpanded(false);
         onCommentSubmitted();
         if (onCancel) onCancel();

         toast({
            title: commentId
               ? "Comentário atualizado"
               : parentId
               ? "Resposta adicionada"
               : "Comentário adicionado",
            description: commentId
               ? "Seu comentário foi editado com sucesso."
               : parentId
               ? "Sua resposta foi publicada com sucesso."
               : "Seu comentário foi publicado com sucesso.",
         });
      } catch (error) {
         toast({
            title: commentId ? "Erro ao editar" : "Erro ao comentar",
            description:
               `Ocorreu um erro: ${(error as Error).message}` ||
               "Erro desconhecido",
            variant: "destructive",
         });
      }
   };

   const handleCancel = () => {
      setIsExpanded(false);
      reset();
      if (onCancel) onCancel();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div className="flex gap-4">
            <Avatar>
               <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
               <AvatarFallback>
                  {user?.name
                     ?.split(" ")
                     .map((n) => n[0])
                     .join("")
                     .toUpperCase() || "U"}
               </AvatarFallback>
            </Avatar>
            <div className="flex-1">
               <div className="relative">
                  <Textarea
                     placeholder={
                        isEditing
                           ? "Edite seu comentário..."
                           : parentId
                           ? "Adicione uma resposta..."
                           : "Adicione um comentário..."
                     }
                     {...register("content", { required: true })}
                     className={`min-h-0 resize-none transition-all duration-200 border-0 border-b focus:ring-0 outline-none overflow-hidden rounded-none bg-transparent ${
                        isExpanded ? "min-h-[100px]" : "h-[40px]"
                     }`}
                     onClick={() => setIsExpanded(true)}
                     rows={1}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/10" />
                  <div
                     className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-200 ${
                        isExpanded ? "w-full" : "w-0"
                     }`}
                  />
               </div>
               {isExpanded && (
                  <div className="flex justify-end gap-2 mt-2">
                     <Button
                        type="button"
                        variant="ghost"
                        onClick={handleCancel}
                     >
                        Cancelar
                     </Button>
                     <Button
                        type="submit"
                        disabled={isSubmitting || !content.trim()}
                     >
                        {isSubmitting
                           ? "Enviando..."
                           : commentId
                           ? "Salvar"
                           : parentId
                           ? "Responder"
                           : "Comentar"}
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </form>
   );
}
