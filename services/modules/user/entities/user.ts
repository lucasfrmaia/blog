import { Comment } from "@/services/lib/prisma";
import { IPost } from "@/services/modules/post/entities/Post";

export interface IUser {
   id: string;
   name: string;
   email: string;
   password: string;
   salt: string;
   image?: string;
   role?: IRole[];
   posts?: IPost[];
   comments?: Comment[];
   createdAt: Date;
   updatedAt: Date;
}

export interface IRole {
   id: string;
   name: string;
   description?: string;
   createdAt: Date;
   updatedAt: Date;
   users?: IUser[];
}

export interface IUserCreate {
   name: string;
   email: string;
   password: string;
}

export interface IUserUpdate {
   id: string;
   name?: string;
   email?: string;
   password?: string;
}
