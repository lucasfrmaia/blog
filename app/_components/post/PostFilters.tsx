"use client";

import { Search, SlidersHorizontal, X, Filter, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";

interface PostFiltersProps {
   initialSearch: string;
   initialCategories: string[];
   initialSortBy: string;
   onApplyFilters: (filters: {
      search: string;
      categories: string[];
      sortBy: string;
   }) => void;
   onResetFilters: () => void;
}

export default function PostFilters({
   initialSearch,
   initialCategories,
   initialSortBy,
   onApplyFilters,
   onResetFilters,
}: PostFiltersProps) {
   const [searchValue, setSearchValue] = useState(initialSearch);
   const [selectedCategories, setSelectedCategories] =
      useState<string[]>(initialCategories);
   const [sortBy, setSortBy] = useState(initialSortBy);

   const { data: categories } = useQuery<ICategory[]>({
      queryKey: ["categories"],
      queryFn: async () => {
         const response = await fetch("/api/categories");
         if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
         }
         return response.json();
      },
   });

   useEffect(() => {
      setSearchValue(initialSearch);
      setSelectedCategories(initialCategories);
      setSortBy(initialSortBy);
   }, [initialSearch, initialCategories, initialSortBy]);

   const handleCategorySelect = (categoryId: string) => {
      setSelectedCategories((prev) =>
         prev.includes(categoryId)
            ? prev.filter((id) => id !== categoryId)
            : [...prev, categoryId]
      );
   };

   const handleRemoveCategory = (categoryId: string) => {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
   };

   const handleApplyFilters = () => {
      onApplyFilters({
         search: searchValue,
         categories: selectedCategories,
         sortBy,
      });
   };

   const handleReset = () => {
      setSearchValue("");
      setSelectedCategories([]);
      setSortBy("recent");
      onResetFilters();
   };

   const hasActiveFilters =
      searchValue || selectedCategories.length > 0 || sortBy !== "recent";

   return (
      <div className="space-y-4 p-4 border rounded-lg bg-card">
         <div className="flex flex-wrap gap-4">
            <div className="flex-1">
               <Input
                  placeholder="Pesquisar posts..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
               />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                  <SelectItem value="popular">Mais populares</SelectItem>
               </SelectContent>
            </Select>
         </div>

         <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
               <Button
                  key={category.id}
                  variant={
                     selectedCategories.includes(category.id)
                        ? "default"
                        : "outline"
                  }
                  size="sm"
                  onClick={() => handleCategorySelect(category.id)}
               >
                  {category.name}
               </Button>
            ))}
         </div>

         {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
               {selectedCategories.map((categoryId) => {
                  const category = categories?.find((c) => c.id === categoryId);
                  if (!category) return null;
                  return (
                     <Badge
                        key={category.id}
                        variant="secondary"
                        style={{
                           backgroundColor: category.color,
                           color: "white",
                        }}
                        className="flex items-center gap-1"
                     >
                        {category.name}
                        <Button
                           variant="ghost"
                           size="icon"
                           className="h-4 w-4 p-0 hover:bg-transparent"
                           onClick={() => handleRemoveCategory(category.id)}
                        >
                           <X className="h-3 w-3" />
                        </Button>
                     </Badge>
                  );
               })}
            </div>
         )}

         <div className="flex items-center justify-end gap-2 pt-4 border-t">
            {hasActiveFilters && (
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="gap-2"
               >
                  <RotateCcw className="h-4 w-4" />
                  Resetar filtros
               </Button>
            )}
            <Button
               disabled={
                  typeof hasActiveFilters == "boolean" && !hasActiveFilters
               }
               onClick={handleApplyFilters}
               className="gap-2"
            >
               <Filter className="h-4 w-4" />
               Aplicar filtros
            </Button>
         </div>
      </div>
   );
}
