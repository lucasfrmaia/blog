import { cn } from "@/lib/utils";
import React from "react";

type IPropTitleSection = {
   children: React.ReactNode;
   className?: string;
};

export default function TitleSection({
   children,
   className,
}: IPropTitleSection) {
   return (
      <h3 className={cn("text-2xl font-bold mb-4", className)}>{children}</h3>
   );
}
