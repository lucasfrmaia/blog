"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   LogOut,
   Settings,
   User,
   PenSquare,
   BookOpen,
   Moon,
   Sun,
   MessageSquare,
   Bell,
} from "lucide-react";
import { useTheme } from "next-themes";
import { NAVEBAR_ROUTES } from "@/utils/constantes/routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { AuthUser } from "@/utils/types/auth";

export default function NaveBar() {
   const { setTheme, theme } = useTheme();
   const pathname = usePathname();
   const { data: session } = useSession();
   const links = Object.values(NAVEBAR_ROUTES);
   const user = session?.user as AuthUser | undefined;

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
                        "transition-colors hover:text-foreground/80",
                        pathname === link
                           ? "text-foreground"
                           : "text-foreground/60"
                     )}
                  >
                     {label}
                  </Link>
               ))}
            </div>

            <div className="ml-auto flex items-center space-x-4">
               {session ? (
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           className="relative h-8 w-8 rounded-full"
                        >
                           <Avatar className="h-8 w-8">
                              <AvatarImage
                                 src={user?.image || "/placeholder.jpg"}
                                 alt={user?.name || ""}
                              />
                              <AvatarFallback>
                                 {user?.name
                                    ?.split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase() || "U"}
                              </AvatarFallback>
                           </Avatar>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                           <Link
                              href="/profile"
                              className="flex w-full items-center"
                           >
                              <User className="mr-2 h-4 w-4" />
                              Perfil
                           </Link>
                        </DropdownMenuItem>
                        {user?.role === "admin" && (
                           <DropdownMenuItem asChild>
                              <Link
                                 href="/dashboard"
                                 className="flex w-full items-center"
                              >
                                 <Settings className="mr-2 h-4 w-4" />
                                 Dashboard
                              </Link>
                           </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                           className="text-red-600"
                           onClick={() => signOut()}
                        >
                           <LogOut className="mr-2 h-4 w-4" />
                           Sair
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               ) : (
                  <div className="flex items-center space-x-2">
                     <Button variant="ghost" asChild>
                        <Link href="/login">Entrar</Link>
                     </Button>
                     <Button asChild>
                        <Link href="/register">Criar Conta</Link>
                     </Button>
                  </div>
               )}
            </div>
         </nav>
      </header>
   );
}
