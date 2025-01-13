import React from "react";
import RecentPost from "./RecentPost";
import BaseSection from "../ui/utils/BaseSection";
import PopularPosts from "./PopularPosts";
import CategoryPosts from "./CategoryPosts";

type IPropPostSection = {
   children?: React.ReactNode;
   className?: string;
};

export default function PostSection({ children, className }: IPropPostSection) {
   return (
      <BaseSection className="flex gap-x-2">
         <RecentPost className="flex-[2]" />
         <aside className="flex-[1]">
            <PopularPosts />
            <CategoryPosts />
         </aside>
      </BaseSection>
   );
}
