"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/post/form/PostForm";

interface EditPostPageProps {
   params: {
      id: string;
   };
}

export default function EditPostPage({ params }: EditPostPageProps) {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);

   const { data: post } = useQuery({
      queryKey: ["post", params.id],
      queryFn: () => apiManager.post.findById(params.id),
   });

   const { data: categories } = useQuery({
      queryKey: ["categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   const handleSubmit = async (formData: FormData) => {
      if (!post) return;
      setIsLoading(true);

      try {
         const data = {
            ...post,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            content: formData.get("content") as string,
            categories: JSON.parse(formData.get("categories") as string),
            img: formData.get("coverImage") as string,
         };

         await apiManager.post.update(data);
         router.push("/dashboard");
      } catch (error) {
         console.error("Erro ao atualizar post:", error);
      } finally {
         setIsLoading(false);
      }
   };

   if (!post || !categories) {
      return <div>Carregando...</div>;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
         >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
               <Button variant="ghost" size="icon" asChild>
                  <Link href="/dashboard">
                     <ArrowLeft className="h-4 w-4" />
                     <span className="sr-only">Voltar</span>
                  </Link>
               </Button>
               <div>
                  <h1 className="text-3xl font-bold">Editar Post</h1>
                  <p className="text-muted-foreground">
                     Edite as informações do seu post
                  </p>
               </div>
            </div>

            <PostForm
               categories={categories}
               isLoading={isLoading}
               defaultValues={post}
               onSubmit={handleSubmit}
            />
         </motion.div>
      </div>
   );
}
