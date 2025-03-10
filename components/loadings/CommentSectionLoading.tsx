export default function CommentSectionLoading() {
   return (
      <div className="space-y-6">
         <div className="h-10 w-full animate-pulse rounded-md bg-muted" />

         <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
               <div key={i} className="border rounded-lg p-4 space-y-3 bg-card">
                  <div className="flex items-center space-x-3">
                     <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                     <div className="space-y-2">
                        <div className="h-4 w-[120px] animate-pulse rounded-md bg-muted" />
                        <div className="h-3 w-[80px] animate-pulse rounded-md bg-muted" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                     <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
