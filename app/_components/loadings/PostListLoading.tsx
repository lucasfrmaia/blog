export default function PostListLoading() {
   return (
      <div className="space-y-6">
         {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4 bg-card">
               <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                     <div className="h-6 w-3/4 animate-pulse rounded-md bg-muted" />
                     <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
                  </div>
                  <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
               </div>
               <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
               </div>
               <div className="flex items-center gap-4">
                  <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
                  <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
               </div>
            </div>
         ))}
      </div>
   );
}
