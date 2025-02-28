import { LoadingSkeleton } from "@/components/ui/loading";

export default function UsersLoading() {
   return (
      <div className="container mx-auto px-4 py-8">
         <div className="space-y-8">
            <LoadingSkeleton />
            <div className="rounded-md border">
               <div className="p-4">
                  <div className="space-y-4">
                     {Array.from({ length: 5 }).map((_, i) => (
                        <div
                           key={i}
                           className="flex items-center justify-between p-4 border-b last:border-0"
                        >
                           <div className="flex items-center gap-4">
                              <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                              <div className="space-y-2">
                                 <div className="h-4 w-[150px] animate-pulse rounded-md bg-muted" />
                                 <div className="h-3 w-[200px] animate-pulse rounded-md bg-muted" />
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="h-8 w-[80px] animate-pulse rounded-md bg-muted" />
                              <div className="h-8 w-[80px] animate-pulse rounded-md bg-muted" />
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
