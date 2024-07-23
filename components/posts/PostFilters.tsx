import React from "react";
import { cn } from "@/lib/utils";
import ToggleGroupItems, {
   ToggleGroupContainer,
   ToggleGroupTitle,
} from "../filters-post/ToggleGroup";
import {
   SelectContainer,
   SelectTitle,
   TSortOptions,
} from "../filters-post/Select";
import { Button } from "../ui/button";
import SearchBar from "../ui/utils/SearchBar";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";

type IPropPostFilters = {
   children?: React.ReactNode;
   className?: string;
};

const sortOptions: TSortOptions = {
   options: [],
};

export default function PostFilters({ children, className }: IPropPostFilters) {
   return (
      <div className="flex justify-between">
         <div className="flex-1 flex items-start gap-x-6 mb-4">
            <ToggleGroupContainer className="w-[30%] flex flex-col flex-wrap">
               <ToggleGroupTitle className="text-xl font-bold mb-2">
                  Categorias
               </ToggleGroupTitle>

               <ToggleGroupItems type="multiple" options={[]} />
            </ToggleGroupContainer>

            <SelectContainer>
               <SelectTitle className="text-xl font-bold mb-2">
                  Ordenacão
               </SelectTitle>

               <Select>
                  <SelectTrigger className="w-[200px]">
                     <SelectValue placeholder="Select uma ordenação..." />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        {sortOptions.options.map((option) => {
                           return (
                              <SelectItem
                                 key={`${option.label}-${option.value}`}
                                 value={option.value}
                              >
                                 {option.label}
                              </SelectItem>
                           );
                        })}
                     </SelectGroup>
                  </SelectContent>
               </Select>

               <Button className="mt-2">Resetar Filtros</Button>
            </SelectContainer>
         </div>

         <SearchBar
            placeholder="Digite sua pesquisa..."
            className="h-10 bg-secondary"
         />
      </div>
   );
}
