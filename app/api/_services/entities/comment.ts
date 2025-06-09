import { Comment } from "@prisma/client";
import { IUser } from "./user";
import { IPost } from "./Post";

export type IComment = Comment & {
   replies?: IComment[];
   user?: IUser;
   post?: IPost;
};

export type ICommentCreate = Pick<
   Comment,
   "content" | "userId" | "postId" | "parentId"
>;

export type ICommentUpdate = Partial<Pick<Comment, "content">> &
   Pick<Comment, "id">;
