import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { FileText, Mail, User } from "lucide-react";
import { redirect } from "next/navigation";
import { AuthUser } from "@/utils/types/auth";
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
import { getServerSession } from "next-auth";
import { IUser } from "../api/_services/modules/user/entities/user";
import { NextAuthOptions } from "../api/auth/auth-options";

export default async function ProfilePage() {
   const session = await getServerSession(NextAuthOptions);
   const response = await fetch(
      `${process.env.API_URL}/users/${session?.user?.id}`
   );
   const userData = (await response.json()) as IUser;

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            <Card>
               <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                     <AvatarImage src={userData?.image} alt={userData?.name} />
                     <AvatarFallback>
                        <User className="h-8 w-8" />
                     </AvatarFallback>
                  </Avatar>
                  <div>
                     <CardTitle>{userData?.name}</CardTitle>
                     <CardDescription className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {userData?.email}
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
                              {new Date(
                                 userData?.createdAt
                              ).toLocaleDateString()}
                           </p>
                        </div>
                        <div>
                           <span className="text-sm text-muted-foreground">
                              Função
                           </span>
                           <p className="capitalize">
                              {userData?.role?.name || "Usuário"}
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
                              {userData?.posts?.length || 0} posts publicados
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
