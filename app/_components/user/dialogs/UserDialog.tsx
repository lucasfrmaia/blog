"use client";

import { Button } from "@/app/_components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/app/_components/ui/dialog";
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
import { useToast } from "@/app/_components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/app/_components/ui/select";
import { IRole } from "@/app/api/_services/modules/role/entities/role";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
   name: z.string().min(1, "O nome é obrigatório"),
   email: z.string().email("Email inválido"),
   role: z.coerce.number().int(),
});

interface UserDialogProps {
   user: any;
   children?: React.ReactNode;
}

export function UserDialog({ user, children }: UserDialogProps) {
   const [open, setOpen] = useState(false);
   const { toast } = useToast();

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: user?.name ?? "",
         email: user?.email ?? "",
         password: "",
         role: user?.role ?? "",
      },
   });

   const { data: roles, isLoading } = useQuery<IRole[]>({
      queryKey: ["roles"],
      queryFn: async () => {
         const response = await fetch(`/api/roles`);
         if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erro Desconhecido");
         }
         return response.json();
      },
   });

   const onSubmit = async (data: z.infer<typeof formSchema>) => {
      try {
         const response = await fetch(`/api/users/${user?.id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error("Erro ao atualizar usuário");
         }

         toast({
            title: "Usuário atualizado",
            description: "O usuário foi atualizado com sucesso!",
         });

         setOpen(false);
      } catch (error) {
         toast({
            title: "Erro",
            description:
               "Ocorreu um erro ao atualizar o usuário" +
               (error as Error).message,
            variant: "destructive",
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            {children || <Button>Editar Usuário</Button>}
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Editar Usuário</DialogTitle>
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
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input type="email" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="role"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Papel</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger disabled={isLoading}>
                                    <SelectValue placeholder="Selecione o papel" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {roles?.map((role) => {
                                    return (
                                       <SelectItem value={String(role.id)}>
                                          {role.name}
                                       </SelectItem>
                                    );
                                 })}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit">Salvar</Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
