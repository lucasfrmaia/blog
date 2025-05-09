import { LoadingSkeleton } from "@/app/_components/ui/loading";

export default function CreateCategoryLoading() {
   return (
      <div className="container mx-auto px-4 py-8">
         <div className="max-w-2xl mx-auto">
            <LoadingSkeleton />
            <div className="space-y-6 mt-8">
               {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                     <div className="h-4 w-[100px] animate-pulse rounded-md bg-muted" />
                     <div className="h-10 animate-pulse rounded-md bg-muted" />
                  </div>
               ))}
               <div className="h-10 w-[150px] animate-pulse rounded-md bg-muted" />
            </div>
         </div>
      </div>
   );
}
