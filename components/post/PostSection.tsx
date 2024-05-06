import React from "react";
import RecentPost from "./RecentPost";
import PopularPost from "./PopularPost";

type IPropPostSection = {
   children?: React.ReactNode;
   className?: string;
};

export default function PostSection({ children, className }: IPropPostSection) {
   return (
      <section className="flex gap-x-2">
         <RecentPost className="flex-[2]" />
         <PopularPost className="flex-1" />
      </section>
   );
}
