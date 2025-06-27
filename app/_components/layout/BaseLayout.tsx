'use client';

import React from 'react';
import Footer from '../footer/Footer';
import NaveBar from '../header/NaveBar';
import { twMerge } from 'tailwind-merge';

interface BaseLayoutProps {
   children: React.ReactNode;
   className?: string;
}

export default function BaseLayout({ children, className }: BaseLayoutProps) {
   return (
      <div className="min-h-screen flex flex-col">
         <NaveBar />
         <main className={twMerge('flex-1 max-md:p-4', className)}>
            {children}
         </main>
         <Footer />
      </div>
   );
}
