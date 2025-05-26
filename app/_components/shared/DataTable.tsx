"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../ui/table";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

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
      const delta = 1;
      const range = [];
      const rangeWithDots = [];

      rangeWithDots.push(1);

      if (page > 2) {
         rangeWithDots.push("...");
      }

      for (
         let i = Math.max(2, page - delta);
         i <= Math.min(totalPages - 1, page + delta);
         i++
      ) {
         range.push(i);
      }

      rangeWithDots.push(...range);

      if (page < totalPages - 1) {
         rangeWithDots.push("...");
      }

      if (totalPages > 1) {
         rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
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
                  <TableRow key={rowIndex}>
                     {columns.map((column, colIndex) => (
                        <TableCell key={colIndex} className={column.className}>
                           {column.accessorKey(item)}
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
               Mostrando {start} até {end} de {total} registros
            </div>
            <div className="flex items-center gap-2">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange(1)}
                  disabled={page === 1}
               >
                  <FaAngleDoubleLeft className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
               >
                  <ChevronLeft className="h-4 w-4" />
               </Button>

               {getPageNumbers().map((pageNumber, index) => (
                  <div key={index}>
                     {pageNumber === "..." ? (
                        <span className="px-3 py-2 text-muted-foreground">
                           ...
                        </span>
                     ) : (
                        <Button
                           variant={pageNumber === page ? "default" : "outline"}
                           size="icon"
                           onClick={() =>
                              typeof pageNumber === "number" &&
                              onPageChange(pageNumber)
                           }
                        >
                           {pageNumber}
                        </Button>
                     )}
                  </div>
               ))}

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
