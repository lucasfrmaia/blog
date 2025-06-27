import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '../ui/table';
import {
   DoubleArrowLeftIcon,
   DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

export interface Column<T> {
   header: string;
   accessorKey: (item: T) => ReactNode;
   className?: string;
}

export interface DataTableProps<T> {
   data: T[];
   columns: Column<T>[];
   pagination: {
      page: number;
      pageSize: number;
      total: number;
   };
   onPageChange: (page: number) => void;
}

export function DataTable<T>({
   data,
   columns,
   pagination,
   onPageChange,
}: DataTableProps<T>) {
   const { page, pageSize, total } = pagination;
   const totalPages = Math.ceil(total / pageSize);
   const start = (page - 1) * pageSize + 1;
   const end = Math.min(start + pageSize - 1, total);

   const getPageNumbers = () => {
      const pageNumbers: (number | string)[] = [];

      if (totalPages <= 3) {
         for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
         }
      } else {
         pageNumbers.push(1);

         if (page === 2) {
            pageNumbers.push(2, '...');
         } else if (page === totalPages - 1) {
            pageNumbers.push('...', totalPages - 1);
         } else if (page > 2 && page < totalPages - 1) {
            pageNumbers.push('...', page, '...');
         } else {
            pageNumbers.push(2, '...');
         }

         pageNumbers.push(totalPages);
      }

      return pageNumbers;
   };

   return (
      <div className="space-y-4">
         <Table>
            <TableHeader>
               <TableRow>
                  {columns.map((column, index) => (
                     <TableHead key={index} className={column.className}>
                        {column.header}
                     </TableHead>
                  ))}
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((item, rowIndex) => (
                  <TableRow key={String(item) + rowIndex}>
                     {columns.map((column, colIndex) => (
                        <TableCell
                           key={colIndex + column.header + column.className}
                           className={column.className}
                        >
                           {column.accessorKey(item)}
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         <div className="flex items-center justify-between flex-wrap gap-y-2">
            <div className="text-sm text-muted-foreground">
               Mostrando {start} até {end} de {total} registros
            </div>

            <div className="flex items-center gap-2">
               <Button
                  variant="outline"
                  size="icon"
                  className="flex md:hideen"
                  onClick={() => onPageChange(1)}
                  disabled={page == 1}
               >
                  <DoubleArrowLeftIcon className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
               >
                  <ChevronLeft className="h-4 w-4" />
               </Button>

               {/* Páginações numéricas - escondidas em telas menores */}
               <div className="hidden md:flex items-center gap-2">
                  {getPageNumbers().map((pageNumber, index) => (
                     <div key={index}>
                        {pageNumber === '...' ? (
                           <span className="px-3 py-2 text-muted-foreground">
                              ...
                           </span>
                        ) : (
                           <Button
                              variant={
                                 pageNumber === page ? 'default' : 'outline'
                              }
                              size="icon"
                              onClick={() =>
                                 typeof pageNumber === 'number' &&
                                 onPageChange(pageNumber)
                              }
                           >
                              {pageNumber}
                           </Button>
                        )}
                     </div>
                  ))}
               </div>

               {/* Botão Próximo - visível sempre */}
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange(page + 1)}
                  disabled={page >= totalPages}
               >
                  <ChevronRight className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  size="icon"
                  className="flex md:hideen"
                  onClick={() => onPageChange(totalPages)}
                  disabled={page >= totalPages}
               >
                  <DoubleArrowRightIcon className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   );
}
