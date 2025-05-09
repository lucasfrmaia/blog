import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
   className?: string;
}

export function LoadingSpinner({ className }: LoadingProps) {
   return (
      <div className={cn("flex items-center justify-center", className)}>
         <Loader2 className="h-6 w-6 animate-spin" />
      </div>
   );
}

export function LoadingSkeleton() {
   return (
      <div className="space-y-4">
         <div className="h-8 w-[250px] animate-pulse rounded-md bg-muted" />
         <div className="h-4 w-[200px] animate-pulse rounded-md bg-muted" />
         <div className="space-y-2">
            <div className="h-10 animate-pulse rounded-md bg-muted" />
            <div className="h-10 animate-pulse rounded-md bg-muted" />
         </div>
      </div>
   );
}
