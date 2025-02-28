"use client";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

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

   return (
      <div>
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

         <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
               Mostrando {start} até {end} de {total} registros
            </div>
            <div className="flex items-center space-x-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
               >
                  <ChevronLeft className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(page + 1)}
                  disabled={page >= totalPages}
               >
                  <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   );
}
