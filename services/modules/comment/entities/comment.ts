import { Post, User } from "@/services/lib/prisma";

export interface IComment {
   id: string;
   content: string;
   createdAt: Date;
   updatedAt: Date;
   userId: string;
   postId: string;
   user?: User;
   post?: Post;
}

export interface ICommentCreate {
   content: string;
   userId: string;
   postId: string;
}

export interface ICommentUpdate {
   id: string;
   content?: string;
}
