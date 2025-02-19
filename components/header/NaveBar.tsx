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

export default function NaveBar() {
   const { setTheme, theme } = useTheme();
   const pathname = usePathname();
   const links = Object.values(NAVEBAR_ROUTES);

   // TODO: Implementar lógica de autenticação
   const isAuthenticated = false;
   const user = {
      name: "John Doe",
      email: "john@example.com",
      image: "https://github.com/shadcn.png",
   };

   return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
               <div className="flex items-center gap-8">
                  <Link href="/" className="flex items-center space-x-2">
                     <span className="text-xl font-bold">Blog</span>
                  </Link>

                  <div className="hidden md:flex items-center space-x-1">
                     {links.map(({ link, label }) => (
                        <Link
                           key={label}
                           href={link}
                           className={cn(
                              "px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                              pathname === link
                                 ? "bg-accent text-accent-foreground"
                                 : "text-foreground/60"
                           )}
                        >
                           {label}
                        </Link>
                     ))}
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                           <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                           <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                           <span className="sr-only">Alternar tema</span>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                           <Sun className="mr-2 h-4 w-4" />
                           Claro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                           <Moon className="mr-2 h-4 w-4" />
                           Escuro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                           <Settings className="mr-2 h-4 w-4" />
                           Sistema
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  {isAuthenticated ? (
                     <>
                        <Button
                           variant="ghost"
                           size="icon"
                           className="relative"
                           asChild
                        >
                           <Link href="/notifications">
                              <Bell className="h-5 w-5" />
                              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
                           </Link>
                        </Button>

                        <Button variant="ghost" size="icon" asChild>
                           <Link href="/dashboard/create">
                              <PenSquare className="h-5 w-5" />
                           </Link>
                        </Button>

                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button
                                 variant="ghost"
                                 className="relative h-9 w-9 rounded-full"
                              >
                                 <Avatar className="h-9 w-9">
                                    <AvatarImage
                                       src={user.image}
                                       alt={user.name}
                                    />
                                    <AvatarFallback>
                                       {user.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent className="w-56" align="end">
                              <DropdownMenuLabel className="font-normal">
                                 <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                       {user.name}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                       {user.email}
                                    </p>
                                 </div>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                 <Link
                                    href="/profile"
                                    className="flex items-center cursor-pointer"
                                 >
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                 <Link
                                    href="/my-posts"
                                    className="flex items-center cursor-pointer"
                                 >
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    <span>Meus Posts</span>
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                 <Link
                                    href="/my-comments"
                                    className="flex items-center cursor-pointer"
                                 >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Meus Comentários</span>
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                 <Link
                                    href="/settings"
                                    className="flex items-center cursor-pointer"
                                 >
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configurações</span>
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer">
                                 <LogOut className="mr-2 h-4 w-4" />
                                 <span>Sair</span>
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </>
                  ) : (
                     <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild>
                           <Link href="/register">Criar conta</Link>
                        </Button>
                        <Button asChild>
                           <Link href="/login">Entrar</Link>
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
}
