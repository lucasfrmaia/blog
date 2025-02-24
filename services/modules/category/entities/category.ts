import { Post } from "@/services/lib/prisma";

export interface ICategory {
   id: string;
   name: string;
   color: string;
   posts?: Post[];
}

export interface ICategoryCreate {
   name: string;
   color: string;
}

export interface ICategoryUpdate {
   id: string;
   name?: string;
   color?: string;
}
