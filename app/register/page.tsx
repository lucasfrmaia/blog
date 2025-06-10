import React from 'react';
import { cn } from '@/lib/utils';

import FormRegister from './FormRegister';
import Footer from '../_components/footer/Footer';
import NaveBar from '../_components/header/NaveBar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextAuthOptions } from '../api/auth/auth-options';
import { ROUTES_PAGE } from '@/utils/constantes/routes';

type IProppage = {
   children?: React.ReactNode;
   className?: string;
};

export default async function page({ children, className }: IProppage) {
   const session = await getServerSession(NextAuthOptions);

   if (session?.user) {
      redirect(ROUTES_PAGE.home.link);
   }

   return (
      <>
         <NaveBar />
         <main
            className={cn(
               'w-full h-[70vh] flex items-center justify-center',
               className,
            )}
         >
            <FormRegister />
         </main>
         <Footer />
      </>
   );
}
