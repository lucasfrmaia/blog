import React from "react";
import { cn } from "@/lib/utils";

type IProppage = {
   children?: React.ReactNode;
   className?: string;
};

export default function page({ children, className }: IProppage) {
   return <div className={cn("", className)}>Hello World</div>;
}
