import React from "react";
import {
   FooterContent,
   FooterLink,
   FooterText,
   FooterTitle,
   FooterUl,
} from "./FooterComponent";
import { globalUtils } from "@/utils/classes";
import { ICategory } from "@/app/(entities)/interfaces";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type IPropFooter = {
   children?: React.ReactNode;
   className?: string;
};

export default async function Footer({ children, className }: IPropFooter) {
   const links = Object.values(globalUtils.routes);
   const response = await fetch(globalUtils.apiRoutes.categories.all);
   const { categories } = (await response.json()) as {
      categories: ICategory[];
   };

   return (
      <footer className="px-space-page p-4">
         <div className="flex gap-x-8 py">
            <FooterContent className="flex-[2]">
               <FooterTitle>Sobre</FooterTitle>
               <p className="text-muted-foreground">
                  Neste exemplo, o contêiner flexível .container se ajustará
                  automaticamente à largura do texto dentro do elemento .text,
                  sem a necessidade de inline-block. O uso de flex-wrap: wrap;
                  permite que o texto quebre para a próxima linha, se
                  necessário.
               </p>
            </FooterContent>

            <FooterContent className="flex-1">
               <FooterTitle>Categorias</FooterTitle>
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
                  {categories.map((category) => {
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
