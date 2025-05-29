import { ICategory } from "../../category/entities/category";
import { IComment } from "../../comment/entities/comment";
import { IUser } from "../../user/entities/user";

export interface IPost {
   id: string;
   title: string;
   description: string;
   content: string;
   img: string;
   views: number;
   createdAt: Date;
   updatedAt: Date;
   authorId: string;
   author?: IUser;
   categories?: ICategory[];
   comments?: IComment[];
}

export interface IPostCreate {
   title: string;
   description: string;
   content: string;
   img: string;
   authorId: string;
   categories: string[];
}

export interface IPostUpdate {
   id: string;
   title?: string;
   content?: string;
   img?: string;
   categories?: string[];
}
