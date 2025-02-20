"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ICategory } from "@/services/modules/category/entities/category";

interface PostPreviewProps {
   title: string;
   description: string;
   content: string;
   coverImage?: string;
   categories: ICategory[];
}

export default function PostPreview({
   title,
   description,
   content,
   coverImage,
   categories,
}: PostPreviewProps) {
   return (
      <article className="max-w-4xl mx-auto">
         {coverImage && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
               <img
                  src={coverImage}
                  alt={title}
                  className="object-cover w-full h-full"
               />
            </div>
         )}

         <h1 className="text-4xl font-bold mb-4">{title}</h1>

         <div className="flex items-center space-x-4 mb-8">
            <Avatar>
               <AvatarImage src="/placeholder-avatar.jpg" />
               <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div>
               <p className="font-medium">Preview</p>
               <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
               </p>
            </div>
         </div>

         <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
               <Badge key={category.id} variant="secondary">
                  {category.title}
               </Badge>
            ))}
         </div>

         <Card className="p-6 mb-8">
            <p className="text-lg text-muted-foreground">{description}</p>
         </Card>

         <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
         />
      </article>
   );
}
