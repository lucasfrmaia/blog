"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES_PAGE } from "@/utils/constantes/routes";

type IPropFormRegister = {
   children?: React.ReactNode;
   className?: string;
};

export default function FormRegister({
   children,
   className,
}: IPropFormRegister) {
   return (
      <form className="w-[40vw] h-[60%]">
         <div className="w-full text-center">
            <h1 className="font-semibold text-3xl">Cadastro</h1>
         </div>

         <div className="mb-4">
            <Label>Nome de Usuário</Label>
            <Input placeholder="Digite seu email..." />
         </div>

         <div className="mb-4">
            <Label>Email</Label>
            <Input type="email" placeholder="Digite seu email..." />
         </div>

         <div className="mb-4">
            <Label>Senha</Label>
            <Input type="password" placeholder="Digite sua senha..." />
         </div>

         <div className="flex items-center gap-x-2 mb-4">
            <Label>
               Li e aceito os{" "}
               <Link
                  className="hover:underline text-primary"
                  href={ROUTES_PAGE.termsOfUse.link}
               >
                  Termos de Uso
               </Link>{" "}
            </Label>
         </div>

         <Button variant="secondary" className="w-full rounded-lg h-20 mb-4">
            Cadastra-se
         </Button>

         <div className="text-center">
            <span>
               Já possui uma conta?{" "}
               <Link
                  className="hover:underline text-primary"
                  href={ROUTES_PAGE.login.link}
               >
                  Logue-se
               </Link>{" "}
            </span>
         </div>
      </form>
   );
}
