"use client";

import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
   ICategory,
   ICategoryCreate,
} from "@/app/api/_services/modules/category/entities/category";
import { Button } from "../ui/button";
import {
   FormField,
   FormItem,
   FormLabel,
   FormControl,
   FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const categoryFormSchema = z.object({
   name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
   description: z
      .string()
      .min(3, "A descrição deve ter pelo menos 3 caracteres"),
   color: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Cor inválida"),
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
   category?: ICategory;
   isSubmitting?: boolean;
   onSubmit: (data: ICategoryCreate) => Promise<void>;
}

export default function CategoryForm({
   category,
   isSubmitting,
   onSubmit,
}: CategoryFormProps) {
   const form = useForm<CategoryFormData>({
      resolver: zodResolver(categoryFormSchema),
      defaultValues: {
         name: category?.name || "",
         color: category?.color || "#000000",
         description: category?.description || "",
      },
   });

   const handleSubmit = async (data: CategoryFormData) => {
      await onSubmit(data);
      if (!category) {
         form.reset();
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome da Categoria</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Digite o nome da categoria"
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
                     <FormLabel>Nome da Categoria</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Digite o nome da categoria"
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
                     <div className="flex gap-4">
                        <FormControl>
                           <Input
                              type="color"
                              className="h-10 w-20 p-1"
                              {...field}
                           />
                        </FormControl>

                        <FormControl>
                           <Input
                              placeholder="#000000"
                              {...field}
                              className="flex-1"
                           />
                        </FormControl>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
               {isSubmitting
                  ? "Salvando..."
                  : category
                  ? "Atualizar Categoria"
                  : "Criar Categoria"}
            </Button>
         </form>
      </Form>
   );
}
