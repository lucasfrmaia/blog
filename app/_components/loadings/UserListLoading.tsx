export default function UserListLoading() {
   return (
      <div className="space-y-4">
         {Array.from({ length: 5 }).map((_, i) => (
            <div
               key={i}
               className="flex items-center justify-between p-4 border rounded-lg bg-card"
            >
               <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
                  <div className="space-y-2">
                     <div className="h-5 w-[180px] animate-pulse rounded-md bg-muted" />
                     <div className="h-4 w-[140px] animate-pulse rounded-md bg-muted" />
                  </div>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="h-8 w-[100px] animate-pulse rounded-md bg-muted" />
                  <div className="h-8 w-[100px] animate-pulse rounded-md bg-muted" />
                  <div className="h-8 w-[40px] animate-pulse rounded-md bg-muted" />
               </div>
            </div>
         ))}
      </div>
   );
}
