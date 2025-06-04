import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { FileText, Mail, User, Lock } from "lucide-react";
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
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "../_components/ui/tabs";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import { Label } from "../_components/ui/label";

export default async function ProfilePage({
   searchParams,
}: {
   searchParams: { tab?: string };
}) {
   const session = await getServerSession(NextAuthOptions);
   const response = await fetch(
      `${process.env.API_URL}/users/${session?.user?.id}`
   );
   const userData = (await response.json()) as IUser;

   const defaultTab = searchParams.tab || "comments";

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            <Card className="mb-8">
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
               <CardContent>
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
               </CardContent>
            </Card>

            <Tabs defaultValue={defaultTab} className="space-y-4">
               <TabsList>
                  <TabsTrigger value="comments">Meus Comentários</TabsTrigger>
                  <TabsTrigger value="password">Alterar Senha</TabsTrigger>
               </TabsList>

               <TabsContent value="comments">
                  <Card>
                     <CardHeader>
                        <CardTitle>Meus Comentários</CardTitle>
                        <CardDescription>
                           Veja e gerencie todos os seus comentários
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        {/* Aqui será implementada a lista de comentários do usuário */}
                        <div className="space-y-4">
                           {userData?.comments?.map((comment) => (
                              <Card key={comment.id}>
                                 <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                       <div>
                                          <p className="text-sm text-muted-foreground">
                                             {format(
                                                new Date(comment.createdAt),
                                                "dd 'de' MMMM 'de' yyyy",
                                                { locale: ptBR }
                                             )}
                                          </p>
                                          <p className="mt-2">
                                             {comment.content}
                                          </p>
                                       </div>
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-destructive"
                                       >
                                          Deletar
                                       </Button>
                                    </div>
                                 </CardContent>
                              </Card>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="password">
                  <Card>
                     <CardHeader>
                        <CardTitle>Alterar Senha</CardTitle>
                        <CardDescription>
                           Altere sua senha de acesso
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <form className="space-y-4">
                           <div className="space-y-2">
                              <Label htmlFor="current-password">
                                 Senha Atual
                              </Label>
                              <Input
                                 id="current-password"
                                 type="password"
                                 placeholder="Digite sua senha atual"
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="new-password">Nova Senha</Label>
                              <Input
                                 id="new-password"
                                 type="password"
                                 placeholder="Digite sua nova senha"
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="confirm-password">
                                 Confirmar Nova Senha
                              </Label>
                              <Input
                                 id="confirm-password"
                                 type="password"
                                 placeholder="Confirme sua nova senha"
                              />
                           </div>
                           <Button type="submit">Alterar Senha</Button>
                        </form>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>
      </BaseLayout>
   );
}
