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

const formSchema = z.object({
   name: z.string().min(1, "O nome é obrigatório"),
   email: z.string().email("Email inválido"),
   password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .optional(),
   role: z.string().min(1, "O papel é obrigatório"),
});

interface UserDialogProps {
   mode: "create" | "edit";
   user?: any;
   children?: React.ReactNode;
}

export function UserDialog({ mode, user, children }: UserDialogProps) {
   const [open, setOpen] = useState(false);
   const { toast } = useToast();
   const router = useRouter();

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: user?.name ?? "",
         email: user?.email ?? "",
         password: "",
         role: user?.role ?? "",
      },
   });

   const onSubmit = async (data: z.infer<typeof formSchema>) => {
      try {
         const response = await fetch(
            mode === "create" ? "/api/users" : `/api/users/${user?.id}`,
            {
               method: mode === "create" ? "POST" : "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
            }
         );

         if (!response.ok) {
            throw new Error("Erro ao salvar usuário");
         }

         toast({
            title: mode === "create" ? "Usuário criado" : "Usuário atualizado",
            description: `O usuário foi ${
               mode === "create" ? "criado" : "atualizado"
            } com sucesso!`,
         });

         setOpen(false);
         router.refresh();
      } catch (error) {
         toast({
            title: "Erro",
            description: "Ocorreu um erro ao salvar o usuário.",
            variant: "destructive",
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            {children || (
               <Button>
                  {mode === "create" ? "Criar Usuário" : "Editar Usuário"}
               </Button>
            )}
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  {mode === "create" ? "Criar Novo Usuário" : "Editar Usuário"}
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
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              {mode === "create"
                                 ? "Senha"
                                 : "Nova Senha (opcional)"}
                           </FormLabel>
                           <FormControl>
                              <Input type="password" {...field} />
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
                                 <SelectTrigger>
                                    <SelectValue placeholder="Selecione o papel" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="admin">
                                    Administrador
                                 </SelectItem>
                                 <SelectItem value="editor">Editor</SelectItem>
                                 <SelectItem value="user">Usuário</SelectItem>
                              </SelectContent>
                           </Select>
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
