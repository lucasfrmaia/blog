import { Comment, Post, Role } from "@/services/lib/prisma";

export interface IUser {
   id: string;
   name: string;
   email: string;
   password: string;
   salt: string;
   createdAt: Date;
   updatedAt: Date;
   role?: Role[];
   posts?: Post[];
   comments?: Comment[];
}

export interface IRole {
   id: string;
   name: string;
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
