import React from "react";
import { cn } from "@/lib/utils";
import NaveBar from "@/components/header/NaveBar";
import Footer from "@/components/footer/Footer";
import ContentPostPage from "@/components/posts-page/ContentPostPage";

type IProppage = {
   children?: React.ReactNode;
   className?: string;
};

export default function page({ children, className }: IProppage) {
   return (
      <>
         <NaveBar />
         <ContentPostPage />
         <Footer />
      </>
   );
}
