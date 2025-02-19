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
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type IPropFormLogin = {
   children?: React.ReactNode;
   className?: string;
};

const schema = z.object({
   email: z.string().email().min(1, "Este campo é obrigatório"),
   password: z.string().min(1, "Este campo é obrigatório"),
   remember: z.boolean(),
});

type FormProps = z.infer<typeof schema>;

export default function FormLogin({ children, className }: IPropFormLogin) {
   const router = useRouter();

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
   } = useForm<FormProps>({ resolver: zodResolver(schema) });

   const onSubmit: SubmitHandler<FormProps> = async (data) => {
      const { email, password } = data;

      const response = await signIn("credentials", {
         email: email,
         password: password,
         redirect: false,
      });

      if (!response?.error) {
         router.replace(ROUTES_PAGE.home.link);
      } else {
         setError("email", { message: "O usuário ou senha está incorreto" });
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
                  Bem-vindo de volta!
               </CardTitle>
               <CardDescription>
                  Entre com suas credenciais para acessar sua conta
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
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

                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                        <Checkbox
                           id="remember"
                           {...register("remember")}
                           disabled={isSubmitting}
                        />
                        <Label
                           htmlFor="remember"
                           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                           Manter Conectado
                        </Label>
                     </div>

                     <Link
                        href={ROUTES_PAGE.recovery.link}
                        className="text-sm text-primary hover:underline"
                     >
                        Esqueceu sua senha?
                     </Link>
                  </div>

                  <Button
                     type="submit"
                     className="w-full"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Entrando...
                        </>
                     ) : (
                        "Entrar"
                     )}
                  </Button>

                  <div className="text-center text-sm">
                     <span className="text-muted-foreground">
                        Não possui uma conta?{" "}
                        <Link
                           href={ROUTES_PAGE.register.link}
                           className="text-primary hover:underline"
                        >
                           Registre-se
                        </Link>
                     </span>
                  </div>
               </form>
            </CardContent>
         </Card>
      </motion.div>
   );
}
