'use client';

import PopularCategories from './_components/category/PopularCategories';
import BaseLayout from './_components/layout/BaseLayout';
import PostSection from './_components/post-section/PostSection';
import Presentation from './_components/presetation/Presetation';

export default function Home() {
   return (
      <BaseLayout>
         <Presentation />
         <PopularCategories />
         <PostSection />
      </BaseLayout>
   );
}
