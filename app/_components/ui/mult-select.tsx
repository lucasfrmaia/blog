'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { IoMdClose as X } from 'react-icons/io';
import { FaCheck as Check } from 'react-icons/fa';
import { LuChevronsUpDown as ChevronsUpDown } from 'react-icons/lu';
import { FaTrashAlt } from 'react-icons/fa';
import { Button } from './button';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Badge } from './badge';

export type OptionType = {
   label: string;
   value: string;
};

interface MultiSelectProps {
   options: OptionType[];
   selected: string[];
   onChange: React.Dispatch<React.SetStateAction<string[]>>;
   className?: string;
   label?: string;
}

export function MultiSelect({
   options,
   selected,
   onChange,
   className,
   label = 'Nenhum item foi selecionado...',
   ...props
}: MultiSelectProps) {
   const [open, setOpen] = React.useState(false);

   const handleUnselect = (item: string) => {
      onChange(selected.filter((i) => i !== item));
   };

   return (
      <Popover open={open} onOpenChange={setOpen} {...props}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className={`w-full justify-between ${
                  selected.length > 1 ? 'h-auto' : 'h-10'
               }`}
               onClick={() => setOpen(!open)}
            >
               {selected.length === 0 && <span>{label}</span>}
               {selected.length !== 0 && (
                  <div className="flex gap-1 flex-wrap">
                     {selected.map((item) => (
                        <Badge
                           variant="secondary"
                           key={item}
                           className="mr-1 mb-1"
                           onClick={(e) => {
                              handleUnselect(item);
                              e.stopPropagation();
                           }}
                        >
                           {item}
                           <span className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                           </span>
                        </Badge>
                     ))}
                  </div>
               )}
               <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-full p-0">
            <Command className={className}>
               <CommandInput placeholder="Search ..." />
               <CommandList>
                  <CommandEmpty>No item found.</CommandEmpty>
                  <CommandGroup
                     heading="Escolha uma opção..."
                     className="max-h-64 overflow-auto"
                  >
                     {options.map((option) => (
                        <CommandItem
                           key={option.value}
                           className="cursor-pointer"
                           onSelect={() => {
                              onChange(
                                 selected.includes(option.value)
                                    ? selected.filter(
                                         (item) => item !== option.value,
                                      )
                                    : [...selected, option.value],
                              );
                              setOpen(false);
                           }}
                        >
                           <Check
                              className={cn(
                                 'mr-2 h-4 w-4',
                                 selected.includes(option.value)
                                    ? 'opacity-100'
                                    : 'opacity-0',
                              )}
                           />
                           {option.label}
                        </CommandItem>
                     ))}
                     <CommandItem
                        onSelect={() => {
                           onChange([]);
                           setOpen(false);
                        }}
                        className="max-h-64 overflow-auto text-destructive/60 flex items-center gap-x-2"
                     >
                        <FaTrashAlt />
                        Limpar todos os items
                     </CommandItem>
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   );
}
