import React, { useState } from "react";
import { cn } from "@/lib/utils";
import NaveBar from "@/components/header/NaveBar";
import Footer from "@/components/footer/Footer";
import BaseSection from "@/components/ui/utils/BaseSection";

import FormCreatePost from "./FormCreatPost";

type IPropPage = {
   children?: React.ReactNode;
   className?: string;
};

export default function Page({ children, className }: IPropPage) {
   return (
      <>
         <NaveBar />
         <BaseSection>
            <FormCreatePost />
         </BaseSection>
         <Footer />
      </>
   );
}
