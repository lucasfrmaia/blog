import React from "react";
import RecentPost from "./RecentPost";
import BaseSection from "../ui/utils/BaseSection";
import AsidePost from "./AsidePost";

type IPropPostSection = {
   children?: React.ReactNode;
   className?: string;
};

export default function PostSection({ children, className }: IPropPostSection) {
   return (
      <BaseSection className="flex gap-x-2">
         <RecentPost className="flex-[2]" />
         <AsidePost className="flex-1" />
      </BaseSection>
   );
}
