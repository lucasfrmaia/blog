import { Comment } from "@/services/lib/prisma";
import { IPost } from "@/services/modules/post/entities/Post";
import { IRole } from "../../role/entities/role";

export interface IUser {
   id: string;
   name: string;
   email: string;
   password: string;
   salt: string;
   image?: string;
   createdAt: Date;
   updatedAt: Date;
   role?: IRole;
   posts?: IPost[];
   comments?: Comment[];
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
