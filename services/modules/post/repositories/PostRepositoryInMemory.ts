import { IPost } from "../entities/Post";
import { IPostRepository } from "./PostRepository";

export class PostRepositoryInMemory implements IPostRepository {
   async getLastPost(): Promise<IPost> {
      return {} as IPost;
   }
   private posts: IPost[] = [];

   async create(post: IPost): Promise<void> {
      this.posts.push(post);
   }

   async update(post: IPost): Promise<void> {
      const index = this.posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
         this.posts[index] = post;
      }
   }

   async findById(id: string): Promise<IPost | null> {
      const post = this.posts.find((p) => p.id === id);
      return post || null;
   }

   async findAll(amount: number): Promise<IPost[]> {
      return this.posts.slice(0, amount);
   }

   async findPerPage(data: {
      amountPerPage: number;
      page: number;
   }): Promise<IPost[]> {
      const { amountPerPage, page } = data;
      return this.posts.slice((page - 1) * amountPerPage, page * amountPerPage);
   }

   async findPopular(amount: number): Promise<IPost[]> {
      return this.posts.sort((a, b) => b.views - a.views).slice(0, amount);
   }

   async delete(id: string): Promise<void> {
      this.posts = this.posts.filter((p) => p.id !== id);
   }
}
