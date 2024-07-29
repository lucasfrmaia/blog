import React from "react";
import { cn } from "@/lib/utils";
import TitleSection from "../ui/utils/TitleSection";
import { ICategory } from "@/services/modules/category/entities/category";
import {
   PostContainer,
   PostImage,
   PostContent,
   PostTitle,
   PostCategories,
   PostDescription,
   PostReadMoreButton,
   PostCategoriesBadge,
} from "../post-component/PostComponent";
import { randomApiManager } from "@/services/modules/ApiManager";
import { AMOUNT_POST_RECENT } from "@/utils/constantes/constants";

type IPropAsidePost = {
   children?: React.ReactNode;
   className?: string;
};

export default async function AsidePost({
   children,
   className,
}: IPropAsidePost) {
   const categories = await randomApiManager.category.findAll();
   const posts = await randomApiManager.post.findAll(5);

   return (
      <aside className={cn("", className)}>
         <article className={className}>
            <h4 className="text-muted-foreground">Oque está em alta</h4>
            <TitleSection>Posts Populares</TitleSection>

            <div>
               {posts.map((post) => {
                  return (
                     <PostContainer
                        className="mb-4"
                        key={`RecentPost-${post.id}`}
                     >
                        <PostContent>
                           <PostTitle post={post} />
                           <PostCategoriesBadge post={post} />
                           <PostDescription post={post} />
                        </PostContent>
                     </PostContainer>
                  );
               })}
            </div>
         </article>

         <article className={cn("", className)}>
            <h4 className="text-muted-foreground">Procure por categoria</h4>
            <TitleSection>Categorias Populares</TitleSection>

            <ul className="flex flex-wrap gap-4">
               {categories.map(({ color, title, id }) => {
                  return (
                     <li
                        key={`category-popular-${id}`}
                        style={{ backgroundColor: color + "80" }}
                        className="inline-flex justify-center items-center h-9 text-center px-4 rounded-md font-bold"
                     >
                        {title}
                     </li>
                  );
               })}
            </ul>
         </article>
      </aside>
   );
}
