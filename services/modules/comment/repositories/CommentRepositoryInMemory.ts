import { IComment } from "../entities/comment";
import { ICommentRepository } from "./CommentRepository";

export class CommentRepositoryInMemory implements ICommentRepository {
   private comments: IComment[] = [];

   async create(comment: IComment): Promise<void> {
      this.comments.push(comment);
   }

   async update(comment: IComment): Promise<void> {
      const index = this.comments.findIndex((c) => c.id === comment.id);
      if (index !== -1) {
         this.comments[index] = comment;
      }
   }

   async findById(id: string): Promise<IComment | null> {
      const comment = this.comments.find((c) => c.id === id);
      return comment || null;
   }

   async findByPostSlug(postSlug: string): Promise<IComment[]> {
      return this.comments.filter((c) => c.postSlug === postSlug);
   }

   async findAll(): Promise<IComment[]> {
      return this.comments;
   }

   async delete(id: string): Promise<void> {
      this.comments = this.comments.filter((c) => c.id !== id);
   }
}
