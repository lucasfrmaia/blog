import { Post, User } from "@/services/lib/prisma";

export interface IComment {
   id: number;
   content: string;
   createdAt: Date;
   updatedAt: Date;
   userId: number;
   postId: number;
   user?: User;
   post?: Post;
}

export interface ICommentCreate {
   content: string;
   userId: number;
   postId: number;
}

export interface ICommentUpdate {
   id: number;
   content?: string;
}
