import { Category, Comment, User } from "@/services/lib/prisma";

export interface IPost {
   id: number;
   title: string;
   content: string;
   createdAt: Date;
   categoryId: number;
   authorId: number;
   author?: User;
   comments?: Comment[];
   categories?: Category[];
}

export interface IPostCreate {
   title: string;
   content: string;
   categoryId: number;
   authorId: number;
}

export interface IPostUpdate {
   id: number;
   title?: string;
   content?: string;
   categoryId?: number;
}
