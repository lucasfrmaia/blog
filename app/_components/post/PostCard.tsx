import Image from "next/image";
import Link from "next/link";

import { Clock, MessageSquare, Eye } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

interface PostCardProps {
   id: string;
   title: string;
   excerpt: string;
   coverImage: string;
   readTime: string;
   category: string;
   views?: number;
   commentsCount?: number;
}

export default function PostCard({
   id,
   title,
   excerpt,
   coverImage,
   readTime,
   category,
   views = 0,
   commentsCount = 0,
}: PostCardProps) {
   return (
      <Link href={`/posts/${id}`}>
         <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
            <div className="relative h-48 overflow-hidden">
               <img
                  src={coverImage}
                  alt={title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
               />
               <Badge
                  variant="secondary"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
               >
                  {category}
               </Badge>
            </div>
            <CardHeader className="border-b bg-card">
               <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {title}
               </h3>
            </CardHeader>
            <CardContent className="pt-4">
               <p className="text-muted-foreground line-clamp-2 mb-4">
                  {excerpt}
               </p>
               <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                     <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {readTime}
                     </span>
                     <span className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        {views}
                     </span>
                  </div>
                  <span className="flex items-center">
                     <MessageSquare className="mr-1 h-4 w-4" />
                     {commentsCount}
                  </span>
               </div>
            </CardContent>
         </Card>
      </Link>
   );
}
