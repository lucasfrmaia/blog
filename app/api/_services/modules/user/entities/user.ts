import { IComment } from "../../comment/entities/comment";
import { IPost } from "../../post/entities/Post";
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
   comments?: IComment[];
}

export interface IUserCreate {
   name: string;
   email: string;
   password: string;
   roleId: number;
}

export interface IUserUpdate {
   id: string;
   name?: string;
   email?: string;
   password?: string;
}
