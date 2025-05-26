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

function formDataToObject(
   formData: FormData
): Record<string, string | string[]> {
   const obj: Record<string, string | string[]> = {};

   for (const [key, value] of formData.entries()) {
      if (key in obj) {
         const existing = obj[key];
         if (Array.isArray(existing)) {
            existing.push(value.toString());
         } else {
            obj[key] = [existing, value.toString()];
         }
      } else {
         obj[key] = value.toString();
      }
   }

   return obj;
}

export function PostDialog({ mode, post, children }: PostDialogProps) {
   const [open, setOpen] = useState(false);
   const { toast } = useToast();
   const router = useRouter();

   const handleSubmit = async (formData: FormData) => {
      const formDataObject = formDataToObject(formData);

      try {
         const response = await fetch(
            mode === "create" ? "/api/posts/create" : `/api/posts/${post?.id}`,
            {
               method: mode === "create" ? "POST" : "PATCH",
               body: JSON.stringify(formDataObject),
            }
         );

         if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.message || "Erro Desconhecido");
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
            description: `Ocorreu um erro ao salvar o post: ${
               (error as Error).message
            }`,
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
         <DialogContent className="max-w-4xl max-h-[90vh]">
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
