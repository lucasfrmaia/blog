import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";

interface CommentReplyFormProps {
   parentId: string;
   postId: string;
   onCancel: () => void;
   onSubmitted: () => void;
}

export function CommentReplyForm({
   parentId,
   postId,
   onCancel,
   onSubmitted,
}: CommentReplyFormProps) {
   const { data: session } = useSession();
   const { toast } = useToast();
   const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting },
   } = useForm({ defaultValues: { content: "" } });

   const onSubmit = async (data: { content: string }) => {
      try {
         const response = await fetch("/api/comments/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               content: data.content,
               postId: postId,
               userId: session?.user.id,
               parent_id: parentId,
            }),
         });

         if (!response.ok) throw new Error("Erro ao criar resposta");

         reset();
         onSubmitted();
         toast({
            title: "Resposta enviada",
            description: "Sua resposta foi publicada.",
         });
      } catch (err) {
         toast({
            title: "Erro",
            description: (err as Error).message,
            variant: "destructive",
         });
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
         <Textarea
            placeholder="Escreva sua resposta..."
            {...register("content", { required: true })}
            className="min-h-[80px]"
         />
         <div className="flex items-center space-x-2">
            <Button type="submit" disabled={isSubmitting}>
               {isSubmitting ? "Enviando..." : "Responder"}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel}>
               Cancelar
            </Button>
         </div>
      </form>
   );
}
