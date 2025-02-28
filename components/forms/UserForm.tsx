"use client";

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
import { IUser, IUserUpdate } from "@/services/modules/user/entities/user";

const formSchema = z.object({
   name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
   email: z.string().email("Email inválido"),
   password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormProps {
   defaultValues?: Partial<IUser>;
   isSubmitting?: boolean;
   onSubmit: (data: IUserUpdate) => Promise<void>;
}

export default function UserForm({
   defaultValues,
   isSubmitting,
   onSubmit,
}: UserFormProps) {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: defaultValues?.name || "",
         email: defaultValues?.email || "",
      },
   });

   const handleSubmit = async (data: FormValues) => {
      if (!defaultValues?.id) return;

      const updateData: IUserUpdate = {
         id: defaultValues.id,
         ...data,
      };

      await onSubmit(updateData);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input {...field} type="email" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nova Senha (opcional)</FormLabel>
                     <FormControl>
                        <Input {...field} type="password" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" disabled={isSubmitting}>
               {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
         </form>
      </Form>
   );
}
