"use client";

import { Button } from "@/app/_components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/app/_components/ui/dialog";
import { IPost } from "@/app/api/_services/modules/post/entities/Post";
import { useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";
import { useRouter } from "next/navigation";
import PostForm from "../form/PostForm";

interface PostDialogProps {
   mode: "create" | "edit";
   post?: IPost;
   children?: React.ReactNode;
}

export function PostDialog({ mode, post, children }: PostDialogProps) {
   const [open, setOpen] = useState(false);
   const { toast } = useToast();
   const router = useRouter();

   const handleSubmit = async (formData: FormData) => {
      try {
         const response = await fetch(
            mode === "create" ? "/api/posts/create" : `/api/posts/${post?.id}`,
            {
               method: mode === "create" ? "POST" : "PATCH",
               body: formData,
            }
         );

         if (!response.ok) {
            throw new Error("Erro ao salvar post");
         }

         toast({
            title: mode === "create" ? "Post criado" : "Post atualizado",
            description: `O post foi ${
               mode === "create" ? "criado" : "atualizado"
            } com sucesso!`,
         });

         setOpen(false);
         router.refresh();
      } catch (error) {
         toast({
            title: "Erro",
            description: "Ocorreu um erro ao salvar o post.",
            variant: "destructive",
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            {children || (
               <Button>
                  {mode === "create" ? "Criar Post" : "Editar Post"}
               </Button>
            )}
         </DialogTrigger>
         <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader>
               <DialogTitle>
                  {mode === "create" ? "Criar Novo Post" : "Editar Post"}
               </DialogTitle>
            </DialogHeader>

            <div className="overflow-y-auto">
               <PostForm defaultValues={post} onSubmit={handleSubmit} />
            </div>
         </DialogContent>
      </Dialog>
   );
}
