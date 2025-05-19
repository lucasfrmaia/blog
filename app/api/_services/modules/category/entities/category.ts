import { Post } from "@prisma/client";

export interface ICategory {
   id: string;
   name: string;
   color: string;
   description: string;
   posts?: Post[];
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
