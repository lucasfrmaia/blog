import React from 'react';
import { BsFilterRight } from 'react-icons/bs';

type IPropFiltersWithLabel = {};

export default function FiltersWithLabel({}: IPropFiltersWithLabel) {
   return (
      <div className="flex justify-center items-center gap-x-1  text-lg">
         <BsFilterRight className="w-10 h-10 text-accent-color" />
         Filtros
      </div>
   );
}
