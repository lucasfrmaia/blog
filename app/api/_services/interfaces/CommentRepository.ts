import { ICommentCreate, ICommentUpdate, IComment } from "../entities/comment";
import { IBaseRepository } from "./BaseRepository";

export interface ICommentRepository
   extends IBaseRepository<IComment, ICommentCreate, ICommentUpdate> {
   findByPostId(postId: string): Promise<IComment[]>;
   findByUserId(userId: string): Promise<IComment[]>;
}
