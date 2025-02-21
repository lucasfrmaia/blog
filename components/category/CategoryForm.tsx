"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ICategory } from "@/services/modules/category/entities/category";

const formSchema = z.object({
   name: z.string().min(1, "O nome é obrigatório"),
   color: z.string().min(1, "A cor é obrigatória"),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
   defaultValues?: Partial<ICategory>;
   isLoading?: boolean;
   onSubmit: (values: FormValues) => Promise<void>;
}

export default function CategoryForm({
   defaultValues,
   isLoading,
   onSubmit,
}: CategoryFormProps) {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: defaultValues?.name || "",
         color: defaultValues?.color || "#000000",
      },
   });

   return (
      <Card>
         <CardContent className="pt-6">
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
               >
                  <div className="grid gap-4">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Nome</FormLabel>
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
                              <FormControl>
                                 <div className="flex items-center gap-4">
                                    <Input
                                       type="color"
                                       className="w-20 h-10 p-1"
                                       {...field}
                                    />
                                    <Input
                                       type="text"
                                       placeholder="#000000"
                                       {...field}
                                    />
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                     {isLoading ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Salvando...
                        </>
                     ) : (
                        "Salvar"
                     )}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
}
