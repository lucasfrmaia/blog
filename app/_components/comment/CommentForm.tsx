import { AuthUser } from "@/utils/types/auth";
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
   onCommentSubmitted: () => void;
   onCancel?: () => void;
}

export function CommentForm({
   postId,
   onCommentSubmitted,
   parentId,
   replyToUser,
   onCancel,
}: CommentFormProps) {
   const { data: session } = useSession();
   const user = session?.user;

   const { toast } = useToast();
   const [isExpanded, setIsExpanded] = useState(false);
   const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { isSubmitting },
   } = useForm({
      defaultValues: {
         content: "",
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
         const response = await fetch("/api/comments/create", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               content: data.content,
               postId,
               userId: user?.id,
               parent_id: parentId,
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
            title: parentId ? "Resposta adicionada" : "Comentário adicionado",
            description: parentId
               ? "Sua resposta foi publicada com sucesso."
               : "Seu comentário foi publicado com sucesso.",
         });
      } catch (error) {
         toast({
            title: parentId ? "Erro ao responder" : "Erro ao comentar",
            description:
               `Ocorreu um erro ao tentar publicar ${
                  parentId ? "sua resposta" : "seu comentário"
               }: ` + (error as Error).message,
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
                        parentId
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
