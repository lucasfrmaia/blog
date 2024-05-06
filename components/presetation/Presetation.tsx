import React from "react";
import {
   PostContainer,
   PostContent,
   PostDescription,
   PostImage,
   PostTitle,
} from "../post/PostComponets";

type IPropPresetation = {
   children?: React.ReactNode;
   className?: string;
};

export default function Presetation({ children, className }: IPropPresetation) {
   return (
      <section>
         <div className="w-[80%]">
            <h1 className="text-[3rem] font-normal">
               <span className="font-semibold">Olá Devs! </span>
               Explore minhas histórias e artigos.
            </h1>
         </div>

         <PostContainer>
            <PostImage src={""} alt={""}></PostImage>

            <PostContent>
               <PostTitle children={undefined}></PostTitle>
               <PostDescription children={undefined}></PostDescription>
            </PostContent>
         </PostContainer>
      </section>
   );
}
