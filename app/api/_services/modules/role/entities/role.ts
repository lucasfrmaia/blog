import { IUser } from "../../user/entities/user";

export interface IRole {
   id: string;
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
   id: string;
   name?: string;
   color?: string;
   description?: string;
}
