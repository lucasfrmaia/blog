import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

export default function Pagination({
   currentPage,
   totalPages,
   onPageChange,
}: PaginationProps) {
   if (totalPages <= 1) return null;

   const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
         let i = Math.max(2, currentPage - delta);
         i <= Math.min(totalPages - 1, currentPage + delta);
         i++
      ) {
         range.push(i);
      }

      if (currentPage - delta > 2) {
         rangeWithDots.push(1, "...");
      } else {
         rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
         rangeWithDots.push("...", totalPages);
      } else if (currentPage + delta >= totalPages - 1) {
         rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
   };

   return (
      <div className="flex justify-center items-center gap-2">
         <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
         >
            <ChevronLeft className="h-4 w-4" />
         </Button>

         {getPageNumbers().map((pageNumber, index) => (
            <React.Fragment key={index}>
               {pageNumber === "..." ? (
                  <span className="px-3 py-2">...</span>
               ) : (
                  <Button
                     variant={
                        pageNumber === currentPage ? "default" : "outline"
                     }
                     size="icon"
                     onClick={() =>
                        typeof pageNumber === "number" &&
                        onPageChange(pageNumber)
                     }
                  >
                     {pageNumber}
                  </Button>
               )}
            </React.Fragment>
         ))}

         <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
         >
            <ChevronRight className="h-4 w-4" />
         </Button>
      </div>
   );
}
