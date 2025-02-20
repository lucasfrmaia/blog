import { ICategory } from "../../category/entities/category";

export interface IPost {
   id: string;
   title: string;
   description: string;
   content: string;
   slug: string;
   img?: string;
   views: number;
   createdAt: string;
   updateAt: string;
   categories: ICategory[];
   authorId: string;
}
