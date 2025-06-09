import { ICommentCreate, ICommentUpdate, IComment } from "../entities/comment";

export interface ICommentRepository {
   create(data: ICommentCreate): Promise<void>;
   update(data: ICommentUpdate): Promise<void>;
   findById(id: string): Promise<IComment | null>;
   findAll(): Promise<IComment[]>;
   delete(id: string): Promise<void>;
   findByPostId(postId: string): Promise<IComment[]>;
   findByUserId(userId: string): Promise<IComment[]>;
}
