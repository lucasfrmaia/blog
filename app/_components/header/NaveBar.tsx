'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { NAVEBAR_ROUTES } from '@/utils/constantes/routes';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { AuthUser } from '@/utils/types/auth';
import { UserMenu } from './UserMenu';

// ToDo mudar role
export default function NaveBar() {
   const pathname = usePathname();
   const { data: session } = useSession();
   const user = session?.user as AuthUser | undefined;

   const links = Object.values(NAVEBAR_ROUTES);

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <nav className="container flex h-16 items-center">
            <Link href="/" className="mr-8 flex items-center space-x-2">
               <span className="text-xl font-bold">Blog</span>
            </Link>

            <div className="flex items-center space-x-6 text-sm font-medium">
               {links.map(({ link, label }) => (
                  <Link
                     key={link}
                     href={link}
                     className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname === link
                           ? 'text-foreground'
                           : 'text-foreground/60',
                     )}
                  >
                     {label}
                  </Link>
               ))}

               {user?.role === 1 && (
                  <Link
                     href="/dashboard"
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
            </div>

            <div className="ml-auto">
               <UserMenu />
            </div>
         </nav>
      </header>
   );
}
