import { IUser } from "../../user/entities/user";

export interface IRole {
   id: string;
   name: string;
   description?: string;
   createdAt: Date;
   updatedAt: Date;
   users?: IUser[];
}
