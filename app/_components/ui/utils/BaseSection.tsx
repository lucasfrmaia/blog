import { cn } from '@/lib/utils';
import React from 'react';

type IPropBaseSection = {
   children?: React.ReactNode;
   className?: string;
};

export default function BaseSection({ children, className }: IPropBaseSection) {
   return (
      <section className={cn('px-space-page mb-12', className)}>
         {children}
      </section>
   );
}
