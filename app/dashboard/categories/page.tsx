"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
   title: z.string().min(1, "O título é obrigatório"),
   slug: z.string().min(1, "O slug é obrigatório"),
   color: z.string().min(1, "A cor é obrigatória"),
});

export default function CategoriesPage() {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         slug: "",
         color: "#000000",
      },
   });

   const { data: categories, refetch } = useQuery({
      queryKey: ["categories"],
      queryFn: () => apiManager.category.findAll(),
   });

   const createCategory = useMutation({
      mutationFn: async (values: z.infer<typeof formSchema>) => {
         const category = {
            id: crypto.randomUUID(),
            ...values,
         };
         await apiManager.category.create(category);
         return category;
      },
      onSuccess: () => {
         toast({
            title: "Categoria criada com sucesso!",
            description: "A categoria foi adicionada à lista.",
         });
         form.reset();
         refetch();
      },
      onError: () => {
         toast({
            title: "Erro ao criar categoria",
            description:
               "Ocorreu um erro ao criar a categoria. Tente novamente.",
            variant: "destructive",
         });
      },
   });

   const deleteCategory = useMutation({
      mutationFn: async (id: string) => {
         await apiManager.category.delete(id);
      },
      onSuccess: () => {
         toast({
            title: "Categoria excluída com sucesso!",
         });
         refetch();
      },
      onError: () => {
         toast({
            title: "Erro ao excluir categoria",
            description:
               "Ocorreu um erro ao excluir a categoria. Tente novamente.",
            variant: "destructive",
         });
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      createCategory.mutate(values);
   }

   return (
      <div className="container mx-auto p-6">
         <div className="grid gap-6">
            <Card>
               <CardHeader>
                  <CardTitle>Nova Categoria</CardTitle>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Digite o título"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="slug"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Digite o slug"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="color"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Cor</FormLabel>
                                    <FormControl>
                                       <Input type="color" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <Button
                           type="submit"
                           disabled={createCategory.isPending}
                        >
                           {createCategory.isPending
                              ? "Criando..."
                              : "Criar Categoria"}
                        </Button>
                     </form>
                  </Form>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Categorias</CardTitle>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Título</TableHead>
                           <TableHead>Slug</TableHead>
                           <TableHead>Cor</TableHead>
                           <TableHead className="w-[100px]">Ações</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {categories?.map((category) => (
                           <TableRow key={category.id}>
                              <TableCell>{category.title}</TableCell>
                              <TableCell>{category.slug}</TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <div
                                       className="w-4 h-4 rounded"
                                       style={{
                                          backgroundColor: category.color,
                                       }}
                                    />
                                    {category.color}
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() => {
                                          // TODO: Implementar edição
                                       }}
                                    >
                                       <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() => {
                                          if (
                                             window.confirm(
                                                "Tem certeza que deseja excluir esta categoria?"
                                             )
                                          ) {
                                             deleteCategory.mutate(category.id);
                                          }
                                       }}
                                    >
                                       <Trash2 className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
