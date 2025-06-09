import { Post } from "@prisma/client";
import { ICategory } from "./category";
import { IComment } from "./comment";
import { IUser } from "./user";

type ICategoryListId = {
   categories: string[];
};

export type IPost = Post & {
   author?: IUser;
   categories?: ICategory[];
   comments?: IComment[];
};

export type IPostCreate = Pick<
   Post,
   "title" | "description" | "img" | "content" | "authorId"
> &
   ICategoryListId;

export type IPostUpdate = Partial<Pick<Post, "title" | "content" | "img">> &
   ICategoryListId &
   Pick<Post, "id">;

export type IPostFilters = {
   search?: string;
   categories?: string[];
   sortBy?: string;
};
