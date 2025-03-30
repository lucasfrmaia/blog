"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiManager } from "@/services/modules/ApiManager";
import { AuthUser } from "@/utils/types/auth";
import { BackDashboard } from "@/components/buttons/BackDashboard";
import { useToast } from "@/components/ui/use-toast";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ICategory } from "@/services/modules/category/entities/category";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import PostEditor from "@/components/post/editor/PostEditor";

const formSchema = z.object({
   title: z.string().min(1, "O título é obrigatório"),
   description: z.string().min(1, "A descrição é obrigatória"),
   content: z.string().min(1, "O conteúdo é obrigatório"),
   coverImage: z.string().min(1, "A imagem de capa é obrigatória"),
   categories: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePostPage() {
   const router = useRouter();
   const { data: session } = useSession();
   const { toast } = useToast();
   const user = session?.user as AuthUser;
   const [isSubmitting, setIsSubmitting] = useState(false);

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         description: "",
         content: "",
         coverImage: "",
         categories: [],
      },
   });

   const { data: categories } = useQuery<ICategory[]>({
      queryKey: ["categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   const onSubmit = async (data: FormValues) => {
      if (!user) return;
      setIsSubmitting(true);

      try {
         await apiManager.post.create({
            title: data.title,
            description: data.description,
            content: data.content,
            img: data.coverImage,
            categoryId: data.categories,
            authorId: user.id,
         });

         toast({
            title: "Post criado",
            description: "O post foi criado com sucesso!",
         });

         router.push("/dashboard/posts");
      } catch (error) {
         toast({
            title: "Erro ao criar post",
            description: "Ocorreu um erro ao criar o post.",
            variant: "destructive",
         });
      } finally {
         setIsSubmitting(false);
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
            <div className="flex items-center gap-4 mb-8">
               <BackDashboard />
               <div>
                  <h1 className="text-3xl font-bold">Criar Post</h1>
                  <p className="text-muted-foreground">
                     Crie um novo post para o blog
                  </p>
               </div>
            </div>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
               >
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Título</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Digite o título do post..."
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Descrição</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="Digite uma breve descrição do post..."
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="coverImage"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Imagem de Capa</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="URL da imagem de capa..."
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="categories"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Categorias</FormLabel>
                           <FormControl>
                              <Select
                                 value={field.value[0]}
                                 onValueChange={(value) =>
                                    field.onChange([...field.value, value])
                                 }
                              >
                                 <SelectTrigger>
                                    <SelectValue placeholder="Selecione as categorias" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {categories?.map((category) => (
                                       <SelectItem
                                          key={category.id}
                                          value={category.id}
                                       >
                                          {category.name}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <div className="flex flex-wrap gap-2 mt-2">
                              {field.value.map((categoryId) => {
                                 const category = categories?.find(
                                    (c) => c.id === categoryId
                                 );
                                 return (
                                    category && (
                                       <Button
                                          key={category.id}
                                          variant="secondary"
                                          size="sm"
                                          onClick={() =>
                                             field.onChange(
                                                field.value.filter(
                                                   (id) => id !== category.id
                                                )
                                             )
                                          }
                                       >
                                          {category.name} ×
                                       </Button>
                                    )
                                 );
                              })}
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="content"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Conteúdo</FormLabel>
                           <FormControl>
                              <PostEditor
                                 value={field.value}
                                 onChange={field.onChange}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button
                     type="submit"
                     className="w-full"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? "Criando..." : "Criar Post"}
                  </Button>
               </form>
            </Form>
         </motion.div>
      </div>
   );
}
