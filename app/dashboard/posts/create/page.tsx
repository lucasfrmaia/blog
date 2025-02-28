"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { apiManager } from "@/services/modules/ApiManager";
import PostForm from "@/components/post/form/PostForm";
import { AuthUser } from "@/utils/types/auth";

export default function CreatePostPage() {
   const router = useRouter();
   const { data: session } = useSession();
   const user = session?.user as AuthUser;
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (formData: FormData) => {
      if (!user) return;
      setIsLoading(true);

      try {
         const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            content: formData.get("content") as string,
            categoryId: JSON.parse(formData.get("categories") as string),
            img: formData.get("coverImage") as string,
            authorId: user.id,
         };

         await apiManager.post.create(data);
         router.push("/dashboard");
      } catch (error) {
         console.error("Erro ao criar post:", error);
      } finally {
         setIsLoading(false);
      }
   };

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
                  <h1 className="text-3xl font-bold">Criar Post</h1>
                  <p className="text-muted-foreground">
                     Crie um novo post para o blog
                  </p>
               </div>
            </div>

            <PostForm isLoading={isLoading} onSubmit={handleSubmit} />
         </motion.div>
      </div>
   );
}
