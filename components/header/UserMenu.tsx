"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { AuthUser } from "@/utils/types/auth";

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
                        src={user?.image || "/placeholder-avatar.jpg"}
                        alt={user?.name || ""}
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
                     <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                     <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                     </Link>
                  </DropdownMenuItem>
               </DropdownMenuGroup>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  className="text-red-600"
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
