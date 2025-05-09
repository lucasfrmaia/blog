"use client";

import React from "react";
import Footer from "../footer/Footer";
import NaveBar from "../header/NaveBar";

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
