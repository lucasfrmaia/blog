"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ROUTES_PAGE } from "@/utils/constantes/routes";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

type IPropFormLogin = {
   children?: React.ReactNode;
   className?: string;
};

const schema = z.object({
   email: z.string().min(1, "Este campo é obrigatório"),
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-[40vw] h-[60%]">
         <div className="w-full text-center">
            <h1 className="font-semibold text-3xl">Login</h1>
         </div>

         <div className="mb-4">
            <Label>Email</Label>
            <Input
               {...register("email")}
               disabled={isSubmitting}
               id="email"
               className={`rounded-lg bg-gray-200 mt-2 p-2 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : ""
               } focus:bg-white focus:outline-none`}
               type="email"
               placeholder="Digite seu email..."
            />
            {errors.email && (
               <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
         </div>

         <div className="mb-4">
            <Label htmlFor="password">Senha</Label>
            <Input
               {...register("password")}
               disabled={isSubmitting}
               id="password"
               placeholder="Digite sua senha..."
               className={`p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 ${
                  errors.password ? "border-red-500" : ""
               } focus:bg-white focus:outline-none`}
               type="password"
            />
            {errors.password && (
               <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
         </div>

         <div className="flex items-center justify-between mb-4">
            <div className="flex gap-x-2">
               <Label htmlFor="checkbox-remember" className="flex items-center">
                  <Checkbox
                     {...register("remember")}
                     disabled={isSubmitting}
                     className="mr-1 w-4 h-4"
                     id="checkbox-remember"
                  />{" "}
                  Manter Conectado
               </Label>
            </div>

            <Link
               className="hover:underline text-primary"
               href={ROUTES_PAGE.recovery.link}
            >
               Esqueceu sua senha?
            </Link>
         </div>

         <Button
            type="submit"
            variant="secondary"
            className="w-full rounded-lg h-20 mb-4"
         >
            Login
         </Button>

         <div className="text-center">
            <span>
               Não possui uma conta?{" "}
               <Link
                  className="hover:underline text-primary"
                  href={ROUTES_PAGE.register.link}
               >
                  Registre-se
               </Link>{" "}
            </span>
         </div>
      </form>
   );
}
