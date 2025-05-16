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
import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Select,
   SelectTrigger,
   SelectValue,
   SelectContent,
   SelectItem,
} from "@radix-ui/react-select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
   name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
   email: z.string().email("Email inválido"),
   roleId: z.string().min(1, "Selecione uma função"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditUserPageProps {
   params: {
      id: string;
   };
}

export default function EditUserPage({ params }: EditUserPageProps) {
   const router = useRouter();

   const { data: user, isLoading: isLoadingUser } = useQuery({
      queryKey: ["user", params.id],
      queryFn: () => apiManager.user.findById(params.id),
   });

   const { data: roles, isLoading: isLoadingRoles } = useQuery({
      queryKey: ["roles"],
      queryFn: () => apiManager.role.findAll(),
   });

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: user?.name || "",
         email: user?.email || "",
         roleId: user?.role?.id || "",
      },
   });

   const { mutateAsync: updateUser, isPending } = useMutation({
      mutationFn: async (data: FormValues) => {
         await apiManager.user.update({
            id: params.id,
            ...data,
         });
      },
      onSuccess: () => {
         toast({
            title: "Usuário atualizado com sucesso!",
            description: "As informações do usuário foram atualizadas.",
         });
         router.push("/dashboard");
      },
      onError: () => {
         toast({
            title: "Erro ao atualizar usuário",
            description: "Ocorreu um erro ao tentar atualizar o usuário.",
            variant: "destructive",
         });
      },
   });

   if (isLoadingUser || isLoadingRoles) {
      return <div>Carregando...</div>;
   }

   if (!user) {
      return <div>Usuário não encontrado</div>;
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
                  <h1 className="text-3xl font-bold">Editar Usuário</h1>
                  <p className="text-muted-foreground">
                     Edite as informações do usuário
                  </p>
               </div>
            </div>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(updateUser)}
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
                     name="roleId"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Função</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma função" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {roles?.map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                       {role.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
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
