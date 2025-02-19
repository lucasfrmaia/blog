import { IComment } from "../entities/comment";

export interface ICommentRepository {
   create(comment: IComment): Promise<void>;
   update(comment: IComment): Promise<void>;
   findById(id: string): Promise<IComment | null>;
   findByPostSlug(postSlug: string): Promise<IComment[]>;
   findAll(): Promise<IComment[]>;
   delete(id: string): Promise<void>;
}
