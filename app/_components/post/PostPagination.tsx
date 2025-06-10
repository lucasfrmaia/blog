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

export default function PostPagination({
   currentPage,
   totalPages,
   getPageUrl,
}: PostPaginationProps) {
   if (totalPages <= 1) return null;

   return (
      <div className="mt-8 flex justify-center">
         <Pagination>
            <PaginationContent>
               <PaginationItem>
                  <Link href={getPageUrl(Math.max(1, currentPage - 1))}>
                     <Button variant="outline" disabled={currentPage === 1}>
                        <PaginationPrevious />
                     </Button>
                  </Link>
               </PaginationItem>

               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                     <PaginationItem key={page}>
                        <Link href={getPageUrl(page)}>
                           <Button
                              variant={
                                 currentPage === page ? 'default' : 'outline'
                              }
                           >
                              {page}
                           </Button>
                        </Link>
                     </PaginationItem>
                  ),
               )}

               <PaginationItem>
                  <Link
                     href={getPageUrl(Math.min(totalPages, currentPage + 1))}
                  >
                     <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                     >
                        <PaginationNext />
                     </Button>
                  </Link>
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </div>
   );
}
