import { Category, User, Comment } from "@/services/lib/prisma";

export interface IPost {
   id: string;
   title: string;
   description: string;
   content: string;
   createdAt: Date;
   updatedAt: Date;
   authorId: string;
   views: number;
   img?: string;
   author?: User;
   comments?: Comment[];
   category?: Category[];
}

export interface IPostCreate {
   title: string;
   content: string;
   authorId: string;
   img?: string;
   categoryId?: string[];
}

export interface IPostUpdate {
   id: string;
   title?: string;
   content?: string;
   img?: string;
   categoryId?: string[];
}
