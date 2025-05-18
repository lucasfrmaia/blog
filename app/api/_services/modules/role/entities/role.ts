import { IUser } from "../../user/entities/user";

export interface IRole {
   id: number;
   name: string;
   description: string;
   createdAt: Date;
   updatedAt: Date;
   users?: IUser[];
}

export interface IRoleCreate {
   name: string;
   description: string;
}

export interface IRoleUpdate {
   id: number;
   name?: string;
   color?: string;
   description?: string;
}
