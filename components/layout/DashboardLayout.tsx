"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
   LayoutDashboard,
   FolderOpen,
   FileText,
   Settings,
   Users,
} from "lucide-react";

interface DashboardLayoutProps {
   children: ReactNode;
}

const menuItems = [
   {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
   },
   {
      title: "Categorias",
      href: "/dashboard/categories",
      icon: FolderOpen,
   },
   {
      title: "Posts",
      href: "/dashboard/posts",
      icon: FileText,
   },
   {
      title: "Usuários",
      href: "/dashboard/users",
      icon: Users,
   },
   {
      title: "Configurações",
      href: "/dashboard/settings",
      icon: Settings,
   },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
   const pathname = usePathname();

   return (
      <div className="flex min-h-screen">
         {/* Sidebar */}
         <aside className="w-64 bg-background border-r">
            <div className="h-16 flex items-center px-6 border-b">
               <Link href="/dashboard" className="font-semibold text-xl">
                  Dashboard
               </Link>
            </div>
            <nav className="p-4">
               <ul className="space-y-2">
                  {menuItems.map((item) => {
                     const isActive = pathname.startsWith(item.href);
                     const Icon = item.icon;

                     return (
                        <li key={item.href}>
                           <Link
                              href={item.href}
                              className={cn(
                                 "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                 isActive
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted"
                              )}
                           >
                              <Icon className="h-5 w-5" />
                              {item.title}
                           </Link>
                        </li>
                     );
                  })}
               </ul>
            </nav>
         </aside>

         {/* Main content */}
         <main className="flex-1 bg-muted/30">{children}</main>
      </div>
   );
}
