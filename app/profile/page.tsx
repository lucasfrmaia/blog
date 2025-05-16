"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { FileText, Mail, User } from "lucide-react";
import { redirect } from "next/navigation";
import { apiManager } from "../api/_services/modules/ApiManager";
import { LoadingProfile } from "../_components/loadings/LoadingProfile";
import BaseLayout from "../_components/layout/BaseLayout";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "../_components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";

export default function ProfilePage() {
   const { data: session, status } = useSession();

   if (!session) {
      redirect("/login");
   }

   const { data: user, isLoading } = useQuery({
      queryKey: ["user", session?.user?.id],
      queryFn: async () => {
         if (!session?.user?.id) return null;
         return apiManager.user.findById(session.user.id);
      },
      enabled: !!session?.user?.id,
   });

   if (isLoading) {
      return <LoadingProfile />;
   }

   if (!user) {
      return <div>Usuário não encontrado</div>;
   }

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            <Card>
               <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                     <AvatarImage src={user.image} alt={user.name} />
                     <AvatarFallback>
                        <User className="h-8 w-8" />
                     </AvatarFallback>
                  </Avatar>
                  <div>
                     <CardTitle>{user.name}</CardTitle>
                     <CardDescription className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {user.email}
                     </CardDescription>
                  </div>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div>
                     <h3 className="text-lg font-semibold mb-2">Informações</h3>
                     <div className="grid gap-4">
                        <div>
                           <span className="text-sm text-muted-foreground">
                              Membro desde
                           </span>
                           <p>
                              {format(
                                 new Date(user.createdAt),
                                 "dd 'de' MMMM 'de' yyyy",
                                 { locale: ptBR }
                              )}
                           </p>
                        </div>
                        <div>
                           <span className="text-sm text-muted-foreground">
                              Função
                           </span>
                           <p className="capitalize">
                              {user.role?.name || "Usuário"}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-lg font-semibold mb-2">
                        Atividade no Blog
                     </h3>
                     <div className="grid gap-4">
                        <div className="flex items-center gap-2">
                           <FileText className="h-4 w-4 text-muted-foreground" />
                           <span>
                              {user.posts?.length || 0} posts publicados
                           </span>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </BaseLayout>
   );
}
