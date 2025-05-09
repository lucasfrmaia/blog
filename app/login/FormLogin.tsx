"use client";

import { cn } from "@/lib/utils";
import { ROUTES_PAGE } from "@/utils/constantes/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { Mail, EyeOff, Eye, Link, Loader2, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "../_components/ui/button";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "../_components/ui/card";
import { useToast } from "../_components/ui/use-toast";
import { Input } from "../_components/ui/input";

type IPropFormLogin = {
   children?: React.ReactNode;
   className?: string;
};

const schema = z.object({
   email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
   password: z.string().min(1, "A senha é obrigatória"),
   remember: z.boolean(),
});

type FormProps = z.infer<typeof schema>;

export default function FormLogin({ children, className }: IPropFormLogin) {
   const router = useRouter();
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting: formIsSubmitting },
   } = useForm<FormProps>({ resolver: zodResolver(schema) });

   const onSubmit: SubmitHandler<FormProps> = async (data) => {
      try {
         setIsSubmitting(true);
         const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
         });

         if (response?.error) {
            toast({
               title: "Erro ao fazer login",
               description: "Email ou senha incorretos",
               variant: "destructive",
            });
            return;
         }

         router.replace(ROUTES_PAGE.home.link);

         toast({
            title: "Login realizado com sucesso",
            description: "Bem-vindo de volta!",
         });
      } catch (error) {
         toast({
            title: "Erro ao fazer login",
            description: "Ocorreu um erro inesperado",
            variant: "destructive",
         });
      } finally {
         setIsSubmitting(false);
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
                              type={showPassword ? "text" : "password"}
                              placeholder="Digite sua senha..."
                              className={cn(
                                 "pl-9 pr-9",
                                 errors.password && "border-red-500"
                              )}
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-muted-foreground focus:outline-none"
                           >
                              {showPassword ? (
                                 <EyeOff className="h-4 w-4" />
                              ) : (
                                 <Eye className="h-4 w-4" />
                              )}
                           </button>
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
                        <input
                           type="checkbox"
                           className="h-4 w-4 rounded border border-primary text-primary focus:ring-primary"
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
