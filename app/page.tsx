import BaseLayout from "@/components/layout/BaseLayout";
import Presentation from "@/components/presetation/Presetation";
import PostSection from "@/components/post-section/PostSection";

export default function Home() {
   return (
      <BaseLayout>
         <Presentation />
         <PostSection />
      </BaseLayout>
   );
}
