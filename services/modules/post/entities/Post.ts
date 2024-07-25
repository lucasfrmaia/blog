import { ICategory } from "../../category/entities/category";

export interface IPost {
   id: string;
   createdAt: Date;
   updateAt: Date;
   slug: string;
   title: string;
   description: string;
   img?: string | null;
   views: number;
   catSlug: string;
   userEmail: string;
   categories: ICategory[];
}
