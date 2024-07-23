import React from "react";
import PopularPost from "./PopularPost";
import { cn } from "@/lib/utils";
import AllCategories from "../category/AllCategories";

type IPropAsidePost = {
   children?: React.ReactNode;
   className?: string;
};

export default function AsidePost({ children, className }: IPropAsidePost) {
   return (
      <aside className={cn("", className)}>
         <PopularPost className="mb-12" />
         <AllCategories />
      </aside>
   );
}
