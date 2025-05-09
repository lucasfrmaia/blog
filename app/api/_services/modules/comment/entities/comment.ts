import { IPost } from "../../post/entities/Post";
import { IUser } from "../../user/entities/user";

export interface IComment {
   id: string;
   content: string;
   createdAt: Date;
   updatedAt: Date;
   userId: string;
   postId: string;
   user?: IUser;
   post?: IPost;
}

export interface ICommentCreate {
   content: string;
   userId: string;
   postId: string;
}

export interface ICommentUpdate {
   id: string;
   content?: string;
}
