import { ICategory } from "../../category/entities/category";
import { IComment } from "../../comment/entities/comment";
import { IUser } from "../../user/entities/user";

export interface IPost {
   id: string;
   title: string;
   description: string;
   content: string;
   createdAt: Date;
   updatedAt: Date;
   authorId: string;
   views: number;
   img?: string;
   author?: IUser;
   comments?: IComment[];
   categories?: ICategory[];
}

export interface IPostCreate {
   title: string;
   description: string;
   content: string;
   authorId: string;
   img: string;
   categories: string[];
}

export interface IPostUpdate {
   id: string;
   title?: string;
   content?: string;
   img?: string;
   categories?: string[];
}
