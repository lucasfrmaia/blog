'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { NAVEBAR_ROUTES } from '@/utils/constantes/routes';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { AuthUser } from '@/utils/types/auth';
import { UserMenu } from './UserMenu';
import { ADMIN_ROLE_ID } from '@/utils/constantes/constants';

// Ícones simples para o menu (você pode substituí-los por ícones da sua biblioteca preferida, como lucide-react)
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
   >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
   </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
   >
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
   </svg>
);

// ToDo mudar role
export default function NaveBar() {
   const pathname = usePathname();
   const { data: session } = useSession();
   const user = session?.user as AuthUser | undefined;
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const links = Object.values(NAVEBAR_ROUTES);

   const navLinks = (
      <>
         {links.map(({ link, label }) => (
            <Link
               key={link}
               href={link}
               onClick={() => setIsMenuOpen(false)} // Fecha o menu ao clicar
               className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link ? 'text-foreground' : 'text-foreground/60',
               )}
            >
               {label}
            </Link>
         ))}
         {user?.role === ADMIN_ROLE_ID && (
            <Link
               href="/dashboard"
               onClick={() => setIsMenuOpen(false)} // Fecha o menu ao clicar
               className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname?.startsWith('/dashboard')
                     ? 'text-foreground'
                     : 'text-foreground/60',
               )}
            >
               Dashboard
            </Link>
         )}
      </>
   );

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
         <nav className="container flex h-16 items-center">
            <Link href="/" className="mr-8 flex items-center space-x-2">
               <span className="text-xl font-bold">Blog</span>
            </Link>

            {/* Navegação para Desktop */}
            <div className="hidden items-center space-x-6 text-sm font-medium md:flex">
               {navLinks}
            </div>

            <div className="ml-auto flex items-center space-x-4">
               {/* UserMenu visível no desktop */}
               <div className="hidden md:block">
                  <UserMenu />
               </div>

               {/* Botão do Menu Hambúrguer */}
               <button
                  className="flex items-center justify-center p-2 md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
               >
                  {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
               </button>
            </div>
         </nav>

         {/* Painel do Menu Móvel */}
         {isMenuOpen && (
            <div className="absolute w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background md:hidden">
               <div className="container flex flex-col space-y-4 py-4 text-sm font-medium">
                  {navLinks}
                  <div className="border-t pt-4">
                     <UserMenu />
                  </div>
               </div>
            </div>
         )}
      </header>
   );
}
