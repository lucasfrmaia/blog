import { IPost } from "../../post/entities/Post";

export interface ICategory {
   id: number;
   name: string;
   color: string;
}

export interface ICategoryCreate {
   name: string;
   color: string;
}

export interface ICategoryUpdate {
   id: number;
   name?: string;
   color?: string;
}
