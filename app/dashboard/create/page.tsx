"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CreatePostPage() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [coverImage, setCoverImage] = useState<File | null>(null);
   const [coverImagePreview, setCoverImagePreview] = useState<string>("");

   const { data: categories } = useQuery({
      queryKey: ["categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setCoverImage(file);
         const reader = new FileReader();
         reader.onloadend = () => {
            setCoverImagePreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         const formData = new FormData(e.target as HTMLFormElement);
         const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            content: formData.get("content") as string,
            categoryId: formData.get("category") as string,
            coverImage: coverImage,
         };

         // Aqui você implementaria a lógica para enviar o post para a API
         await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulando uma requisição
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
                  <h1 className="text-3xl font-bold">Criar Novo Post</h1>
                  <p className="text-muted-foreground">
                     Crie um novo post para o blog
                  </p>
               </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
               <div className="grid gap-8">
                  {/* Basic Information */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Informações Básicas</CardTitle>
                        <CardDescription>
                           Defina as informações principais do seu post
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="title">Título</Label>
                           <Input
                              id="title"
                              name="title"
                              placeholder="Digite o título do post"
                              required
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="description">Descrição</Label>
                           <Textarea
                              id="description"
                              name="description"
                              placeholder="Digite uma breve descrição do post"
                              required
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="category">Categoria</Label>
                           <Select name="category" required>
                              <SelectTrigger>
                                 <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                 {categories?.map((category) => (
                                    <SelectItem
                                       key={category.id}
                                       value={category.id}
                                    >
                                       {category.title}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Cover Image */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Imagem de Capa</CardTitle>
                        <CardDescription>
                           Adicione uma imagem de capa para o seu post
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="flex flex-col items-center justify-center gap-4">
                           <div
                              className={cn(
                                 "w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center",
                                 coverImagePreview && "border-0"
                              )}
                           >
                              {coverImagePreview ? (
                                 <img
                                    src={coverImagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                 />
                              ) : (
                                 <div className="text-center p-8">
                                    <ImagePlus className="w-12 h-12 mx-auto text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                       Clique para adicionar uma imagem
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                       PNG, JPG ou GIF até 10MB
                                    </p>
                                 </div>
                              )}
                              <input
                                 type="file"
                                 accept="image/*"
                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                 onChange={handleImageChange}
                              />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Content */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Conteúdo</CardTitle>
                        <CardDescription>
                           Escreva o conteúdo do seu post
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Textarea
                           name="content"
                           placeholder="Digite o conteúdo do post..."
                           className="min-h-[400px]"
                           required
                        />
                     </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex justify-end gap-4">
                     <Button variant="outline" asChild>
                        <Link href="/dashboard">Cancelar</Link>
                     </Button>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLoading ? "Criando..." : "Criar Post"}
                     </Button>
                  </div>
               </div>
            </form>
         </motion.div>
      </div>
   );
}
