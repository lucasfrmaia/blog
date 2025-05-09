import { LoadingSkeleton } from "@/app/_components/ui/loading";

export default function PostsLoading() {
   return (
      <div className="container mx-auto px-4 py-8">
         <div className="space-y-8">
            <LoadingSkeleton />
            <div className="rounded-md border">
               <div className="p-4">
                  <div className="space-y-6">
                     {Array.from({ length: 5 }).map((_, i) => (
                        <div
                           key={i}
                           className="flex items-center justify-between p-4 border-b last:border-0"
                        >
                           <div className="space-y-2">
                              <div className="h-5 w-[300px] animate-pulse rounded-md bg-muted" />
                              <div className="flex items-center gap-2">
                                 <div className="h-4 w-[100px] animate-pulse rounded-md bg-muted" />
                                 <div className="h-4 w-[80px] animate-pulse rounded-md bg-muted" />
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="h-9 w-[90px] animate-pulse rounded-md bg-muted" />
                              <div className="h-9 w-[90px] animate-pulse rounded-md bg-muted" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
