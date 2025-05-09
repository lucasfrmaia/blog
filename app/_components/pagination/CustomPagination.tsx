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
} from "../ui/pagination";

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
               <PaginationPrevious size={undefined} />
            </PaginationItem>

            {Array.from({ length: 3 }).map((_, index) => {
               return (
                  <PaginationItem key={`Pag-${index + 1 + currentPage}`}>
                     <PaginationLink size={undefined}>
                        {index + 1 + currentPage}
                     </PaginationLink>
                  </PaginationItem>
               );
            })}

            <PaginationItem>
               <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem key={`Pag-${Math.floor(totalItems / 5)}`}>
               <PaginationLink size={undefined}>
                  {Math.floor(totalItems / 5)}
               </PaginationLink>
            </PaginationItem>

            <PaginationItem>
               <PaginationNext size={undefined} />
            </PaginationItem>
         </PaginationContent>
      </PaginationDefault>
   );
};

export default CustomPagination;
