import { IComment, ICommentCreate } from "../entities/comment";
import { ICommentRepository } from "./CommentRepository";

export class CommentRepositoryInMemory implements ICommentRepository {
   private comments: IComment[] = [];

   async create(comment: ICommentCreate): Promise<void> {
      this.comments.push({
         ...comment,
         id: "123e4567-e89b-12d3-a456-426614174000",
         createdAt: new Date(),
         updatedAt: new Date(),
      });
   }

   async findByPostId(postId: string): Promise<IComment[]> {
      return this.comments.filter((c) => c.postId === postId);
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

   async findAll(): Promise<IComment[]> {
      return this.comments;
   }

   async delete(id: string): Promise<void> {
      this.comments = this.comments.filter((c) => c.id !== id);
   }
}
