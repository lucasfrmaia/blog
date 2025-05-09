import React from "react";
import { cn } from "@/lib/utils";
import FormLogin from "./FormLogin";
import Footer from "../_components/footer/Footer";
import NaveBar from "../_components/header/NaveBar";

type IPropFormLogin = {
   children?: React.ReactNode;
   className?: string;
};

export default function page({ children, className }: IPropFormLogin) {
   return (
      <>
         <NaveBar />
         <main
            className={cn(
               "w-full h-[70vh] flex items-center justify-center bg-transparent",
               className
            )}
         >
            <FormLogin />
         </main>
         <Footer />
      </>
   );
}
