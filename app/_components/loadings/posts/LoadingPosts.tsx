import BaseLayout from "../../layout/BaseLayout";

export function LoadingPosts() {
   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-8">
               <div className="h-12 bg-muted rounded-lg w-full max-w-md" />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                     <div
                        key={index}
                        className="space-y-4 rounded-lg border p-4"
                     >
                        <div className="h-48 bg-muted rounded-lg" />
                        <div className="space-y-2">
                           <div className="h-6 bg-muted rounded w-3/4" />
                           <div className="h-4 bg-muted rounded w-full" />
                           <div className="h-4 bg-muted rounded w-2/3" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </BaseLayout>
   );
}
