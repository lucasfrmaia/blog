"use client";

import React from "react";
import {
   FooterContent,
   FooterLink,
   FooterText,
   FooterTitle,
   FooterUl,
} from "./FooterComponent";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { randomApiManager } from "@/services/modules/ApiManager";
import { NAVEBAR_ROUTES } from "@/utils/constantes/routes";
import { useQuery } from "@tanstack/react-query";

type IPropFooter = {
   children?: React.ReactNode;
   className?: string;
};

export default function Footer({ children, className }: IPropFooter) {
   const links = Object.values(NAVEBAR_ROUTES);
   const { data: categories, isLoading } = useQuery({
      queryKey: ["all_categories"],
      queryFn: async () => {
         const response = await randomApiManager.category.findAll();
         return response;
      },
   });

   if (isLoading) {
      return null;
   }

   return (
      <footer className="px-space-page p-4">
         <div className="flex gap-x-8 py">
            <FooterContent className="flex-[2]">
               <FooterTitle>Sobre</FooterTitle>
               <p className="text-muted-foreground">
                  Bem-vindo ao meu blog! Aqui, você encontrará uma mistura de
                  insights e tutoriais sobre uma ampla gama de tópicos em
                  computação e matemática.
               </p>
            </FooterContent>

            <FooterContent className="flex-1">
               <FooterTitle>Navegação</FooterTitle>
               <FooterUl className="flex flex-col">
                  {links.map(({ link, label }) => {
                     return (
                        <FooterLink href={link} key={`Footer-${label}`}>
                           {label}
                        </FooterLink>
                     );
                  })}
               </FooterUl>
            </FooterContent>

            <FooterContent className="flex-1">
               <FooterTitle>Categorias</FooterTitle>
               <FooterUl>
                  {categories?.map((category) => {
                     return (
                        <FooterText key={`Footer-${category.id}`}>
                           {category.title}
                        </FooterText>
                     );
                  })}
               </FooterUl>
            </FooterContent>

            <FooterContent className="flex-[2]">
               <FooterTitle>Notificações de Post</FooterTitle>
               <FooterText>
                  Insira seu email para receber Notificações de novos posts
               </FooterText>

               <form className="mt-4">
                  <Input
                     type="email"
                     className="w-full mb-2"
                     placeholder="Digite seu email..."
                  />
                  <Button type="submit" className="w-full">
                     Cadastrar Email
                  </Button>
               </form>
            </FooterContent>
         </div>

         <div className="flex items-center justify-between">
            <FooterContent className="flex-1">Logo...</FooterContent>

            <FooterContent className="flex items-center gap-x-4">
               <FooterLink href="#">Termos de Uso</FooterLink>
               <FooterLink href="#">Politícas de Privacidade</FooterLink>
               <FooterLink href="#">Politícas de Cookies</FooterLink>
            </FooterContent>
         </div>
      </footer>
   );
}
