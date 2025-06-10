import BaseLayout from '../../layout/BaseLayout';
import { Card } from '../../ui/card';
import { Separator } from '../../ui/separator';
import { Skeleton } from '../../ui/skeleton';

export function LoadingOnePostSkeleton() {
   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8 animate-pulse">
            <div className="max-w-4xl mx-auto">
               {/* Capa do post */}
               <div className="w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-full rounded-lg" />
               </div>

               {/* Título */}
               <Skeleton className="h-10 w-3/4 mb-6 rounded" />

               {/* Autor e data */}
               <div className="flex items-center space-x-4 mb-8">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2">
                     <Skeleton className="w-32 h-4" />
                     <Skeleton className="w-24 h-4" />
                  </div>
               </div>

               {/* Categorias */}
               <div className="flex flex-wrap gap-2 mb-8">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
               </div>

               {/* Descrição */}
               <Card className="p-6 mb-8">
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-5 w-5/6 mb-2" />
                  <Skeleton className="h-5 w-3/4" />
               </Card>

               {/* Conteúdo principal */}
               <div className="space-y-4 mb-14">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
               </div>

               <Separator className="my-8" />

               {/* Placeholder para seção de comentários */}
               <Skeleton className="h-6 w-32 mb-4" />
               <Skeleton className="h-20 w-full" />
            </div>
         </div>
      </BaseLayout>
   );
}
