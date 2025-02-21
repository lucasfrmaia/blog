import { IComment, ICommentCreate, ICommentUpdate } from "../entities/comment";

export interface ICommentRepository {
   create(data: ICommentCreate): Promise<void>;
   update(data: ICommentUpdate): Promise<void>;
   findById(id: number): Promise<IComment | null>;
   findAll(): Promise<IComment[]>;
   delete(id: number): Promise<void>;
   findByPostId(postId: number): Promise<IComment[]>;
}
