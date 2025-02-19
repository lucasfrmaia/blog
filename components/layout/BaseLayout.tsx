"use client";

import React from "react";
import NaveBar from "@/components/header/NaveBar";
import Footer from "@/components/footer/Footer";

interface BaseLayoutProps {
   children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
   return (
      <div className="min-h-screen flex flex-col">
         <NaveBar />
         <main className="flex-1">{children}</main>
         <Footer />
      </div>
   );
}
