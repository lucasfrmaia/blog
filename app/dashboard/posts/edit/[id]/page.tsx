"use client";

import { BackDashboard } from "@/app/_components/buttons/BackDashboard";
import PostEditor from "@/app/_components/post/editor/PostEditor";
import { Button } from "@/app/_components/ui/button";
import {
   FormField,
   FormItem,
   FormLabel,
   FormControl,
   FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { useToast } from "@/app/_components/ui/use-toast";
import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { IPost } from "@/app/api/_services/modules/post/entities/Post";
import { AuthUser } from "@/utils/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Select,
   SelectTrigger,
   SelectValue,
   SelectContent,
   SelectItem,
} from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Form } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
   title: z.string().min(1, "O título é obrigatório"),
   description: z.string().min(1, "A descrição é obrigatória"),
   content: z.string().min(1, "O conteúdo é obrigatório"),
   coverImage: z.string().min(1, "A imagem de capa é obrigatória"),
   categories: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditPostPageProps {
   params: {
      id: string;
   };
}

interface Post extends IPost {
   categories: ICategory[];
}

export default function EditPostPage({ params }: EditPostPageProps) {
   const router = useRouter();
   const { data: session } = useSession();
   const { toast } = useToast();
   const user = session?.user as AuthUser;
   const [isSubmitting, setIsSubmitting] = useState(false);

   const { data: post } = useQuery<Post | null, Error>({
      queryKey: ["post", params.id],
      queryFn: async () => {
         const result = await apiManager.post.findById(params.id);
         return result as Post | null;
      },
   });

   const { data: categories } = useQuery<ICategory[], Error>({
      queryKey: ["categories"],
      queryFn: async () => {
         const result = await apiManager.category.findAll();
         return result as ICategory[];
      },
   });

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: post?.title ?? "",
         description: post?.description ?? "",
         content: post?.content ?? "",
         coverImage: post?.img ?? "",
         categories: post?.categories?.map((cat) => cat.id) ?? [],
      },
   });

   const onSubmit = async (data: FormValues) => {
      if (!user) return;
      setIsSubmitting(true);

      try {
         await apiManager.post.update({
            id: params.id,
            title: data.title,
            content: data.content,
            img: data.coverImage,
            categoryId: data.categories,
         });

         toast({
            title: "Post atualizado",
            description: "O post foi atualizado com sucesso!",
         });

         router.push("/dashboard/posts");
      } catch (error) {
         toast({
            title: "Erro ao atualizar post",
            description: "Ocorreu um erro ao atualizar o post.",
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
                  <h1 className="text-3xl font-bold">Editar Post</h1>
                  <p className="text-muted-foreground">
                     Edite as informações do post
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
                                 onValueChange={(value: string) => {
                                    if (!field.value.includes(value)) {
                                       field.onChange([...field.value, value]);
                                    }
                                 }}
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
                     {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                  </Button>
               </form>
            </Form>
         </motion.div>
      </div>
   );
}
