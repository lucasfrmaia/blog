import React from "react";
import { cn } from "@/lib/utils";

import FormRegister from "./FormRegister";
import Footer from "../_components/footer/Footer";
import NaveBar from "../_components/header/NaveBar";

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
