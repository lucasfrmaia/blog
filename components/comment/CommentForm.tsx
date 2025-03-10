import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { apiManager } from "@/services/modules/ApiManager";
import { AuthUser } from "@/utils/types/auth";

interface CommentFormProps {
   postId: string;
   user: AuthUser;
   onCommentSubmitted: () => void;
}

export function CommentForm({
   postId,
   user,
   onCommentSubmitted,
}: CommentFormProps) {
   const { toast } = useToast();
   const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting },
   } = useForm({
      defaultValues: {
         content: "",
      },
   });

   const onSubmit = async (data: { content: string }) => {
      try {
         await apiManager.comment.create({
            content: data.content,
            postId,
            userId: user.id,
         });
         reset();
         onCommentSubmitted();
         toast({
            title: "Comentário adicionado",
            description: "Seu comentário foi publicado com sucesso.",
         });
      } catch (error) {
         toast({
            title: "Erro ao comentar",
            description: "Ocorreu um erro ao tentar publicar seu comentário.",
            variant: "destructive",
         });
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <Textarea
            placeholder="Escreva seu comentário..."
            {...register("content", { required: true })}
            className="min-h-[100px]"
         />
         <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Comentar"}
         </Button>
      </form>
   );
}
