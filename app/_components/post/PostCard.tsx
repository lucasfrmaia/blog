import Image from 'next/image';
import Link from 'next/link';
import { Clock, MessageSquare, Eye, CalendarDays } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ICategory } from '@/app/api/_services/entities/category';
import { CategoryBadge } from '../category/CategoryBadge';

interface PostCardProps {
   id: string;
   title: string;
   excerpt: string;
   coverImage: string;
   readTime: string;
   categories?: ICategory[];
   views?: number;
   commentsCount?: number;
   publishedAt: string | Date; // <- Adicionado
}

export default function PostCard({
   id,
   title,
   excerpt,
   coverImage,
   readTime,
   categories = [],
   views = 0,
   commentsCount = 0,
   publishedAt,
}: PostCardProps) {
   const formattedDate = new Date(publishedAt).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   });

   return (
      <Link href={`/posts/${id}`}>
         <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group w-full">
            <div className="relative h-48 overflow-hidden">
               <img
                  src={coverImage}
                  alt={title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
               />
               {categories.slice(0, 2).map((category) => (
                  <CategoryBadge
                     key={category.id}
                     className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                     category={category}
                  />
               ))}
            </div>
            <CardHeader className="border-b bg-card">
               <h3 className="text-xl font-semibold line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                  {title}
               </h3>
            </CardHeader>
            <CardContent className="pt-4 h-[10rem] flex flex-col justify-between">
               <p className="text-muted-foreground line-clamp-2">{excerpt}</p>

               <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex flex-col mr-1">
                     <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="mr-1 h-4 w-4" />
                        <span>{formattedDate}</span>
                     </div>
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
