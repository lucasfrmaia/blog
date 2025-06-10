import { ITENS_PER_PAGE_TABLE } from '@/utils/constantes/constants';
import { Skeleton } from '../ui/skeleton';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '../ui/table';

// Quantidade fixa de linhas e colunas simuladas
const SKELETON_COL_COUNT = 5;

export function LoadingDataTable() {
   return (
      <div className="space-y-4">
         <Table>
            <TableHeader>
               <TableRow>
                  {Array.from({ length: SKELETON_COL_COUNT }).map(
                     (_, colIdx) => (
                        <TableHead key={colIdx}>
                           <Skeleton className="h-4 w-24" />
                        </TableHead>
                     ),
                  )}
               </TableRow>
            </TableHeader>
            <TableBody>
               {Array.from({ length: ITENS_PER_PAGE_TABLE }).map(
                  (_, rowIdx) => (
                     <TableRow key={rowIdx}>
                        {Array.from({ length: SKELETON_COL_COUNT }).map(
                           (_, colIdx) => (
                              <TableCell key={colIdx}>
                                 <Skeleton className="h-4 w-full" />
                              </TableCell>
                           ),
                        )}
                     </TableRow>
                  ),
               )}
            </TableBody>
         </Table>

         {/* Paginação simulada */}
         <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
               <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-2">
               {Array.from({ length: 5 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-8 w-8 rounded" />
               ))}
            </div>
         </div>
      </div>
   );
}
