"use client";

import { Button } from "@/app/_components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
   Form,
   FormField,
   FormItem,
   FormLabel,
   FormControl,
   FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { useToast } from "@/app/_components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
   name: z.string().min(1, "O nome é obrigatório"),
   description: z.string().min(1, "A descrição é obrigatória"),
   color: z.string().min(1, "A cor é obrigatória"),
});

interface CategoryDialogProps {
   mode: "create" | "edit";
   category?: ICategory;
   children?: React.ReactNode;
}

export function CategoryDialog({
   mode,
   category,
   children,
}: CategoryDialogProps) {
   const [open, setOpen] = useState(false);
   const { toast } = useToast();
   const router = useRouter();

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: category?.name ?? "",
         description: category?.description ?? "",
         color: category?.color ?? "#000000",
      },
   });

   const onSubmit = async (data: z.infer<typeof formSchema>) => {
      try {
         const response = await fetch(
            mode === "create"
               ? "/api/categories/create"
               : `/api/categories/${category?.id}`,
            {
               method: mode === "create" ? "POST" : "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
            }
         );

         if (!response.ok) {
            const errorData = await response.json();

            throw new Error(
               "Erro ao salvar categoria: " +
                  errorData.message +
                  errorData.error
            );
         }

         toast({
            title:
               mode === "create" ? "Categoria criada" : "Categoria atualizada",
            description: `A categoria foi ${
               mode === "create" ? "criada" : "atualizada"
            } com sucesso!`,
         });

         setOpen(false);
         router.refresh();
      } catch (error) {
         toast({
            title: "Erro",
            description:
               "Ocorreu um erro ao salvar a categoria: " +
               (error as Error).message,
            variant: "destructive",
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            {children || (
               <Button>
                  {mode === "create" ? "Criar Categoria" : "Editar Categoria"}
               </Button>
            )}
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  {mode === "create"
                     ? "Criar Nova Categoria"
                     : "Editar Categoria"}
               </DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
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
                              <Input type="color" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit">
                     {mode === "create" ? "Criar" : "Salvar"}
                  </Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
