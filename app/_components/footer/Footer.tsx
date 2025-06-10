'use client';

import React from 'react';
import Link from 'next/link';

import { NAVEBAR_ROUTES } from '@/utils/constantes/routes';
import { useQuery } from '@tanstack/react-query';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ICategory } from '@/app/api/_services/entities/category';

export default function Footer() {
   const links = Object.values(NAVEBAR_ROUTES);
   const { data: categories, isLoading } = useQuery<ICategory[]>({
      queryKey: ['popular_categories'],
      queryFn: async () => {
         const response = await fetch('/api/categories/popular');
         if (!response.ok) {
            throw new Error('Erro ao buscar categorias populares');
         }
         return response.json();
      },
   });

   if (isLoading) {
      return null;
   }

   return (
      <footer className="bg-card">
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {/* Sobre */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Blog Dev</h3>
                  <p className="text-sm text-muted-foreground">
                     Um espaço dedicado ao compartilhamento de conhecimento e
                     experiências no mundo do desenvolvimento de software.
                  </p>
                  <div className="flex space-x-4">
                     <Link
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                     >
                        <Facebook className="h-5 w-5" />
                     </Link>
                     <Link
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                     >
                        <Twitter className="h-5 w-5" />
                     </Link>
                     <Link
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                     >
                        <Instagram className="h-5 w-5" />
                     </Link>
                     <Link
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                     >
                        <Linkedin className="h-5 w-5" />
                     </Link>
                  </div>
               </div>

               {/* Links */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Links Rápidos</h3>
                  <ul className="space-y-2">
                     {links.map(({ link, label }) => (
                        <li key={`footer-${label}`}>
                           <Link
                              href={link}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              {label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Categorias */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Categorias</h3>
                  <ul className="space-y-2">
                     {categories?.slice(0, 3)?.map((category) => (
                        <li key={`footer-${category.id}`}>
                           <Link
                              href={`/category/${category.id}`}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              {category.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Newsletter */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Newsletter</h3>
                  <p className="text-sm text-muted-foreground">
                     Inscreva-se para receber atualizações sobre novos posts e
                     conteúdos exclusivos.
                  </p>
                  <form className="flex gap-2">
                     <Input
                        type="email"
                        placeholder="Seu email"
                        className="max-w-[240px]"
                     />
                     <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                     </Button>
                  </form>
               </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                     © {new Date().getFullYear()} Blog Dev. Todos os direitos
                     reservados.
                  </p>
                  <div className="flex items-center gap-4">
                     <Link
                        href="/terms"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                     >
                        Termos de Uso
                     </Link>
                     <Link
                        href="/privacy-policy"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                     >
                        Política de Privacidade
                     </Link>
                     <Link
                        href="/cookie-policy"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                     >
                        Política de Cookies
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
