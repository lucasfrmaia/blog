import React from "react";
import { cn } from "@/lib/utils";
import NaveBar from "@/components/header/NaveBar";
import Footer from "@/components/footer/Footer";
import FormRegister from "./FormRegister";

type IProppage = {
   children?: React.ReactNode;
   className?: string;
};

export default function page({ children, className }: IProppage) {
   return (
      <>
         <NaveBar />
         <main
            className={cn(
               "w-full h-[70vh] flex items-center justify-center",
               className
            )}
         >
            <FormRegister />
         </main>
         <Footer />
      </>
   );
}
