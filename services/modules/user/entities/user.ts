import { Comment, Post, Role } from "@/services/lib/prisma";

export interface IUser {
   id: number;
   name: string;
   email: string;
   password: string;
   salt: string;
   roleId: number;
   createdAt: Date;
   role?: Role;
   posts?: Post[];
   comments?: Comment[];
}

export interface IRole {
   id: number;
   name: string;
   users?: IUser[];
}

export interface IUserCreate {
   name: string;
   email: string;
   password: string;
   roleId: number;
}

export interface IUserUpdate {
   id: number;
   name?: string;
   email?: string;
   password?: string;
   roleId?: number;
}
