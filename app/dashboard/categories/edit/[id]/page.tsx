"use client";

import { BackDashboard } from "@/app/_components/buttons/BackDashboard";
import { Button } from "@/app/_components/ui/button";
import {
   Form,
   FormField,
   FormItem,
   FormLabel,
   FormControl,
   FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { toast } from "@/app/_components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
   name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
   description: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
   color: z.string().min(4, "Selecione uma cor válida"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditCategoryPageProps {
   params: {
      id: string;
   };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
   const router = useRouter();

   const { data: category, isLoading } = useQuery({
      queryKey: ["category", params.id],
      queryFn: async () => {
         const response = await fetch(`/api/categories/${params.id}`);
         if (!response.ok) {
            throw new Error("Erro ao buscar categoria");
         }
         return response.json();
      },
   });

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: category?.name || "",
         color: category?.color || "",
      },
   });

   const { mutateAsync: updateCategory, isPending } = useMutation({
      mutationFn: async (data: FormValues) => {
         const response = await fetch(`/api/categories/${params.id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error("Erro ao atualizar categoria");
         }
      },
      onSuccess: () => {
         toast({
            title: "Categoria atualizada com sucesso!",
            description: "As informações da categoria foram atualizadas.",
         });
         router.push("/dashboard");
      },
      onError: () => {
         toast({
            title: "Erro ao atualizar categoria",
            description: "Ocorreu um erro ao tentar atualizar a categoria.",
            variant: "destructive",
         });
      },
   });

   // Função que recebe os dados do formulário e chama a mutação
   const onSubmit = async (data: FormValues) => {
      await updateCategory(data);
   };

   if (isLoading) {
      return <div>Carregando...</div>;
   }

   if (!category) {
      return <div>Categoria não encontrada</div>;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
         >
            <div className="flex items-center gap-4 mb-8">
               <BackDashboard />

               <div>
                  <h1 className="text-3xl font-bold">Editar Categoria</h1>
                  <p className="text-muted-foreground">
                     Edite as informações da categoria
                  </p>
               </div>
            </div>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
               >
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nome</FormLabel>
                           <FormControl>
                              <Input {...field} />
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
                              <Input {...field} type="color" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button type="submit" disabled={isPending}>
                     {isPending ? "Salvando..." : "Salvar"}
                  </Button>
               </form>
            </Form>
         </motion.div>
      </div>
   );
}
