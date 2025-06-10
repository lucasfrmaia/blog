import { AuthUser } from '@/utils/types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface ProfileInfoProps {
   user: AuthUser;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
               <Avatar className="h-20 w-20">
                  <AvatarImage
                     src={user.image || '/placeholder-avatar.jpg'}
                     alt={user.name}
                  />
                  <AvatarFallback>
                     {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
               </div>
            </div>
            <div className="grid gap-4">
               <div>
                  <p className="font-medium">Função</p>
                  <p className="text-muted-foreground capitalize">
                     {user.role || 'Usuário'}
                  </p>
               </div>
               <div>
                  <p className="font-medium">Membro desde</p>
                  <p className="text-muted-foreground">
                     {new Date().toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                     })}
                  </p>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
