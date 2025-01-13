import React from "react";

interface IPaginationProps {
   children?: React.ReactNode;
   className?: string;
   currentPage: number;
   totalItems: number;
}

import {
   Pagination as PaginationDefault,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";

const CustomPagination: React.FC<IPaginationProps> = ({
   children,
   className = "",
   totalItems,
   currentPage,
}) => {
   return (
      <PaginationDefault>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious />
            </PaginationItem>

            {Array.from({ length: 3 }).map((_, index) => {
               return (
                  <PaginationItem key={`Pag-${index + 1 + currentPage}`}>
                     <PaginationLink>{index + 1 + currentPage}</PaginationLink>
                  </PaginationItem>
               );
            })}

            <PaginationItem>
               <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem key={`Pag-${Math.floor(totalItems / 5)}`}>
               <PaginationLink>{Math.floor(totalItems / 5)}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
               <PaginationNext />
            </PaginationItem>
         </PaginationContent>
      </PaginationDefault>
   );
};

export default CustomPagination;
