import React from "react";
import { cn } from "@/lib/utils";
import { IPost } from "@/app/(entities)/interfaces";

import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import { POSTS_PER_PAGE } from "@/utils/contasts/ConstatsUtils";

type IPropPostPagination = {
   children?: React.ReactNode;
   className?: string;
   totalPosts?: number;
};

export default function PostPagination({
   children,
   className,
   totalPosts = 0,
}: IPropPostPagination) {
   const totalPages = Math.floor(totalPosts / POSTS_PER_PAGE) || 1;

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious href="#" />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => {
               return (
                  <PaginationItem key={`Pag-${index + 1}`}>
                     <PaginationLink href="#">{index + 1}</PaginationLink>
                  </PaginationItem>
               );
            })}
            <PaginationItem>
               <PaginationNext href="#" />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
