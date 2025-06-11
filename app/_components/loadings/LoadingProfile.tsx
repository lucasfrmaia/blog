import BaseLayout from '../layout/BaseLayout';
import { Card, CardContent, CardHeader } from '../ui/card';

export function LoadingProfile() {
   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8 flex flex-col items-center">
            <Card className="mb-8 w-full max-w-[1000px]">
               <CardHeader className="flex w-full flex-row items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                  <div className="space-y-2">
                     <div className="h-4 w-[120px] animate-pulse rounded-md bg-muted" />
                     <div className="h-3 w-[80px] animate-pulse rounded-md bg-muted" />
                  </div>
                  <div>
                     <div className="w-36 h-4 bg-mutedrounded-md animate-pulse"></div>
                  </div>
               </CardHeader>
               <CardContent className="w-full">
                  <h3 className="bg-muted rounded-md animate-pulse w-56 h-4 mb-4"></h3>
                  <div className="grid gap-4">
                     <div className="flex flex-col gap-y-4">
                        <div className="w-28 bg-muted rounded-md animate-pulse h-4"></div>
                        <p className="w-36 bg-muted h-4 rounded-md animate-pulse"></p>
                     </div>

                     <div className="flex flex-col gap-y-4">
                        <div className="bg-muted h-4 rounded-md animate-pulse w-24"></div>
                        <div className="w-16 bg-muted h-4 rounded-md animate-pulse"></div>
                     </div>
                  </div>

                  <div className="animate-pulse w-56 h-8 bg-muted rounded-md my-10"></div>

                  {[...Array(7).keys()].map((x) => {
                     return (
                        <div className="animate-pulse w-full h-8 bg-muted rounded-md mt-4"></div>
                     );
                  })}
               </CardContent>
            </Card>
         </div>
      </BaseLayout>
   );
}
