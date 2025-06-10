import React from 'react';
import { cn } from '@/lib/utils';

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { VariantProps } from 'class-variance-authority';
import { toggleVariants } from '../ui/toggle';

type IToggleGroupProps = {
   children?: React.ReactNode;
   className?: string;
};

type TOptionsToggleGroup = {
   options: { label: string; value: string }[];
};

export const ToggleGroupContainer = ({
   children,
   className,
}: IToggleGroupProps) => {
   return <div className={cn('', className)}>{children}</div>;
};

export const ToggleGroupTitle = ({
   children,
   className,
}: IToggleGroupProps) => {
   return <h3 className={cn('', className)}>{children}</h3>;
};

export default function ToggleGroupItems({
   options,
   ...props
}: IToggleGroupProps &
   TOptionsToggleGroup &
   React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
   VariantProps<typeof toggleVariants>) {
   return (
      <ToggleGroup
         {...props}
         className={cn('', props.className)}
         variant="outline"
      >
         {options.map((option) => {
            return (
               <ToggleGroupItem value={`${option.label}-${option.value}`}>
                  {option.label}
               </ToggleGroupItem>
            );
         })}
      </ToggleGroup>
   );
}
