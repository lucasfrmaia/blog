"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES_PAGE } from "@/utils/constantes/routes";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { apiManager } from "@/services/modules/ApiManager";
import { toast } from "@/components/ui/use-toast";

type IPropFormRegister = {
   children?: React.ReactNode;
   className?: string;
};

const schema = z.object({
   name: z.string().min(1, "O nome é obrigatório"),
   email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
   password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
   // .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
   // .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
   // .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
   terms: z.boolean().refine((val) => val === true, {
      message: "Você precisa aceitar os termos de uso",
   }),
});

type FormProps = z.infer<typeof schema>;

export default function FormRegister({
   children,
   className,
}: IPropFormRegister) {
   const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<FormProps>({ resolver: zodResolver(schema) });

   const onSubmit: SubmitHandler<FormProps> = async (data) => {
      const { name, email, password } = data;

      try {
         await apiManager.user.create({
            name,
            email,
            password,
         });

         router.push(ROUTES_PAGE.login.link);
      } catch (error) {
         console.error("Erro ao registrar:", error);

         toast({
            title: "Erro ao fazer login",
            description: "Ocorreu um erro inesperado",
            variant: "destructive",
         });
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-md mx-auto"
      >
         <Card className="p-6">
            <CardHeader className="space-y-2 text-center">
               <CardTitle className="text-3xl font-bold">
                  Crie sua conta
               </CardTitle>
               <CardDescription>
                  Preencha os dados abaixo para criar sua conta
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <div className="relative">
                           <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input
                              {...register("name")}
                              disabled={isSubmitting}
                              id="name"
                              placeholder="Digite seu nome..."
                              className={cn(
                                 "pl-9",
                                 errors.name && "border-red-500"
                              )}
                           />
                        </div>
                        {errors.name && (
                           <p className="text-sm text-red-500">
                              {errors.name.message}
                           </p>
                        )}
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input
                              {...register("email")}
                              disabled={isSubmitting}
                              id="email"
                              type="email"
                              placeholder="Digite seu email..."
                              className={cn(
                                 "pl-9",
                                 errors.email && "border-red-500"
                              )}
                           />
                        </div>
                        {errors.email && (
                           <p className="text-sm text-red-500">
                              {errors.email.message}
                           </p>
                        )}
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                           <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input
                              {...register("password")}
                              disabled={isSubmitting}
                              id="password"
                              type="password"
                              placeholder="Digite sua senha..."
                              className={cn(
                                 "pl-9",
                                 errors.password && "border-red-500"
                              )}
                           />
                        </div>
                        {errors.password && (
                           <p className="text-sm text-red-500">
                              {errors.password.message}
                           </p>
                        )}
                     </div>
                  </div>

                  <div className="flex items-center space-x-2">
                     <input
                        type="checkbox"
                        id="terms"
                        {...register("terms")}
                        disabled={isSubmitting}
                     />
                     <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                        Li e aceito os{" "}
                        <Link
                           href={ROUTES_PAGE.termsOfUse.link}
                           className="text-primary hover:underline"
                        >
                           Termos de Uso
                        </Link>
                     </Label>
                  </div>
                  {errors.terms && (
                     <p className="text-sm text-red-500">
                        {errors.terms.message}
                     </p>
                  )}

                  <Button
                     type="submit"
                     className="w-full"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Criando conta...
                        </>
                     ) : (
                        "Criar conta"
                     )}
                  </Button>

                  <div className="text-center text-sm">
                     <span className="text-muted-foreground">
                        Já possui uma conta?{" "}
                        <Link
                           href={ROUTES_PAGE.login.link}
                           className="text-primary hover:underline"
                        >
                           Faça login
                        </Link>
                     </span>
                  </div>
               </form>
            </CardContent>
         </Card>
      </motion.div>
   );
}
