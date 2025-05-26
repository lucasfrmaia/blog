import { IPost } from "../../post/entities/Post";

export interface ICategory {
   id: string;
   name: string;
   color: string;
   description: string;
   createdAt: Date;
   updatedAt: Date;
   posts?: IPost[];
}

export interface ICategoryCreate {
   name: string;
   description: string;
   color: string;
}

export interface ICategoryUpdate {
   id: string;
   name?: string;
   color?: string;
   description: string;
}
