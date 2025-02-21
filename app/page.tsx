"use client";

import BaseLayout from "@/components/layout/BaseLayout";
import Presentation from "@/components/presetation/Presetation";
import PostSection from "@/components/post-section/PostSection";
import PopularCategories from "@/components/category/PopularCategories";

export default function Home() {
   return (
      <BaseLayout>
         <Presentation />
         <PopularCategories />
         <PostSection />
      </BaseLayout>
   );
}
