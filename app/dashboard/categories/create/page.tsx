"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { BackDashboard } from "@/components/buttons/BackDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
   name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
   description: z
      .string()
      .min(10, "A descrição deve ter pelo menos 10 caracteres"),
   color: z.string().min(4, "Selecione uma cor válida"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateCategoryPage() {
   const router = useRouter();

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         description: "",
         color: "#000000",
      },
   });

   const { mutateAsync: createCategory, isPending } = useMutation({
      mutationFn: async (data: FormValues) => {
         await apiManager.category.create(data);
      },
      onSuccess: () => {
         toast({
            title: "Categoria criada com sucesso!",
            description: "A categoria foi criada e já está disponível.",
         });
         router.push("/dashboard/categories");
      },
      onError: () => {
         toast({
            title: "Erro ao criar categoria",
            description: "Ocorreu um erro ao tentar criar a categoria.",
            variant: "destructive",
         });
      },
   });

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
                  <h1 className="text-3xl font-bold">Nova Categoria</h1>
                  <p className="text-muted-foreground">
                     Crie uma nova categoria para o blog
                  </p>
               </div>
            </div>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(createCategory)}
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
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Descrição</FormLabel>
                           <FormControl>
                              <Textarea {...field} />
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
                     {isPending ? "Criando..." : "Criar Categoria"}
                  </Button>
               </form>
            </Form>
         </motion.div>
      </div>
   );
}
