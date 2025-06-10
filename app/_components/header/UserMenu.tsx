'use client';

import { useSession, signOut } from 'next-auth/react';

import { LogOut, Settings, User, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '../theme/ThemeToggle';
import { AuthUser } from '@/utils/types/auth';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// ToDo mudar role
export function UserMenu() {
   const { data: session } = useSession();
   const user = session?.user as AuthUser | undefined;

   if (!session) {
      return (
         <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
               <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
               <Link href="/register">Registrar</Link>
            </Button>
         </div>
      );
   }

   return (
      <div className="flex items-center gap-4">
         <ThemeToggle />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
               >
                  <Avatar className="h-8 w-8">
                     <AvatarImage
                        src={user?.image || '/placeholder-avatar.jpg'}
                        alt={user?.name || ''}
                     />
                     <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                     </AvatarFallback>
                  </Avatar>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
               <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                     <p className="text-sm font-medium leading-none">
                        {user?.name}
                     </p>
                     <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                     </p>
                  </div>
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                     <Link href="/profile" className="w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                     </Link>
                  </DropdownMenuItem>
                  {user?.role === 1 && (
                     <DropdownMenuItem asChild>
                        <Link
                           href="/dashboard"
                           className="w-full cursor-pointer"
                        >
                           <LayoutDashboard className="mr-2 h-4 w-4" />
                           <span>Dashboard</span>
                        </Link>
                     </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                     <Link href="/settings" className="w-full cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                     </Link>
                  </DropdownMenuItem>
               </DropdownMenuGroup>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
               >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}
