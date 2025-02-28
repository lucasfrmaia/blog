import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/services/modules/category/entities/category";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";
import { Badge } from "../ui/badge";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "../ui/sheet";

interface PostFiltersProps {
   search: string;
   category: string;
   sortBy: string;
   categories?: ICategory[];
   onUpdateFilters: (filters: Record<string, string>) => void;
}

export default function PostFilters({
   search,
   category,
   sortBy,
   categories,
   onUpdateFilters,
}: PostFiltersProps) {
   const [searchInput, setSearchInput] = useState(search);

   const handleSearch = useCallback(() => {
      onUpdateFilters({ search: searchInput, page: "1" });
   }, [searchInput, onUpdateFilters]);

   const handleCategoryChange = useCallback(
      (value: string) => {
         onUpdateFilters({ category: value, page: "1" });
      },
      [onUpdateFilters]
   );

   const handleSortChange = useCallback(
      (value: string) => {
         onUpdateFilters({ sortBy: value, page: "1" });
      },
      [onUpdateFilters]
   );

   const clearFilters = useCallback(() => {
      setSearchInput("");
      onUpdateFilters({
         search: "",
         category: "",
         sortBy: "recent",
         page: "1",
      });
   }, [onUpdateFilters]);

   return (
      <div className="mb-8">
         {/* Desktop Filters */}
         <div className="hidden md:flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2">
               <div className="flex-1 flex items-center gap-2 bg-card rounded-lg border p-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                     type="text"
                     placeholder="Buscar posts..."
                     value={searchInput}
                     onChange={(e) => setSearchInput(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                     className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
               </div>
               <Button onClick={handleSearch}>Buscar</Button>
            </div>
            <Select value={category} onValueChange={handleCategoryChange}>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories?.map((cat) => (
                     <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={handleSortChange}>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="popular">Mais populares</SelectItem>
               </SelectContent>
            </Select>
            {(search || category || sortBy !== "recent") && (
               <Button variant="outline" onClick={clearFilters}>
                  Limpar filtros
               </Button>
            )}
         </div>

         {/* Mobile Filters */}
         <div className="md:hidden">
            <div className="flex items-center gap-4">
               <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-card rounded-lg border p-2">
                     <Search className="h-4 w-4 text-muted-foreground" />
                     <Input
                        type="text"
                        placeholder="Buscar posts..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                     />
                  </div>
                  <Button onClick={handleSearch}>Buscar</Button>
               </div>
               <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                     </Button>
                  </SheetTrigger>
                  <SheetContent>
                     <SheetHeader>
                        <SheetTitle>Filtros</SheetTitle>
                        <SheetDescription>
                           Ajuste os filtros para encontrar os posts
                        </SheetDescription>
                     </SheetHeader>
                     <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                           <label className="text-sm font-medium">
                              Categoria
                           </label>
                           <Select
                              value={category}
                              onValueChange={handleCategoryChange}
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="all">Todas</SelectItem>
                                 {categories?.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                       {cat.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium">
                              Ordenar por
                           </label>
                           <Select
                              value={sortBy}
                              onValueChange={handleSortChange}
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Selecione a ordem" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="recent">
                                    Mais recentes
                                 </SelectItem>
                                 <SelectItem value="popular">
                                    Mais populares
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        {(search || category || sortBy !== "recent") && (
                           <Button
                              variant="outline"
                              className="w-full"
                              onClick={clearFilters}
                           >
                              Limpar filtros
                           </Button>
                        )}
                     </div>
                  </SheetContent>
               </Sheet>
            </div>
         </div>

         {/* Active Filters */}
         {(search || category || sortBy !== "recent") && (
            <div className="mt-4 flex flex-wrap gap-2">
               {search && (
                  <Badge variant="secondary" className="text-sm">
                     Busca: {search}
                     <button
                        className="ml-2"
                        onClick={() => {
                           setSearchInput("");
                           onUpdateFilters({ search: "", page: "1" });
                        }}
                     >
                        ×
                     </button>
                  </Badge>
               )}
               {category && (
                  <Badge variant="secondary" className="text-sm">
                     Categoria:{" "}
                     {categories?.find((c) => c.id === category)?.name}
                     <button
                        className="ml-2"
                        onClick={() =>
                           onUpdateFilters({ category: "", page: "1" })
                        }
                     >
                        ×
                     </button>
                  </Badge>
               )}
               {sortBy !== "recent" && (
                  <Badge variant="secondary" className="text-sm">
                     Ordenado por:{" "}
                     {sortBy === "popular" ? "Populares" : "Recentes"}
                     <button
                        className="ml-2"
                        onClick={() =>
                           onUpdateFilters({ sortBy: "recent", page: "1" })
                        }
                     >
                        ×
                     </button>
                  </Badge>
               )}
            </div>
         )}
      </div>
   );
}
