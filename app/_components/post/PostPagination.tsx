import { Button } from '@/app/_components/ui/button';
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/app/_components/ui/pagination';
import Link from 'next/link';

interface PostPaginationProps {
   currentPage: number;
   totalPages: number;
   getPageUrl: (page: number) => string;
}

function getPageNumbers(
   currentPage: number,
   totalPages: number,
): (number | string)[] {
   const pages: (number | string)[] = [];

   if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
         pages.push(i);
      }
   } else {
      pages.push(1);

      if (currentPage === 2) {
         pages.push(2);
         pages.push('...');
      } else if (currentPage === totalPages - 1) {
         pages.push('...');
         pages.push(totalPages - 1);
      } else if (currentPage > 2 && currentPage < totalPages - 1) {
         pages.push('...');
         pages.push(currentPage);
         pages.push('...');
      } else {
         pages.push(2);
         pages.push('...');
      }

      pages.push(totalPages);
   }

   return pages;
}

export default function PostPagination({
   currentPage,
   totalPages,
   getPageUrl,
}: PostPaginationProps) {
   if (totalPages <= 1) return null;

   const pageNumbers = getPageNumbers(currentPage, totalPages);

   return (
      <div className="mt-8 flex justify-center">
         <Pagination>
            <PaginationContent>
               <PaginationItem>
                  <Link href={getPageUrl(Math.max(1, currentPage - 1))}>
                     <Button variant="outline" disabled={currentPage === 1}>
                        <PaginationPrevious size="icon" />
                     </Button>
                  </Link>
               </PaginationItem>

               {pageNumbers.map((page, index) => (
                  <PaginationItem key={index}>
                     {page === '...' ? (
                        <span className="px-2 text-muted-foreground">...</span>
                     ) : (
                        <Link href={getPageUrl(Number(page))}>
                           <Button
                              variant={
                                 currentPage === page ? 'default' : 'outline'
                              }
                           >
                              {page}
                           </Button>
                        </Link>
                     )}
                  </PaginationItem>
               ))}

               <PaginationItem>
                  <Link
                     href={getPageUrl(Math.min(totalPages, currentPage + 1))}
                  >
                     <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                     >
                        <PaginationNext size="icon" />
                     </Button>
                  </Link>
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </div>
   );
}
