import { IPost } from "@/app/(entities)/interfaces";
import { ICategoryManager } from "./category/repositories/category-repository";
import { IPostManager } from "./post/repositories/post-repository";
import { ICategory } from "./category/entities/category";

class PostManager implements IPostManager {
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

class t2 implements ICategoryManager {
   create(note: ICategory): Promise<void> {
      throw new Error("Method not implemented.");
   }
   update(category: ICategory): Promise<void> {
      throw new Error("Method not implemented.");
   }
   findById(id: string): Promise<ICategory | null> {
      throw new Error("Method not implemented.");
   }
   async findAll(): Promise<ICategory[]> {
      return [];
   }
   delete(id: string): Promise<void> {
      throw new Error("Method not implemented.");
   }
}

class RandomApiManager {
   constructor(
      public readonly post: IPostManager,
      public readonly category: ICategoryManager
   ) {}
}

export const randomApiManager = new RandomApiManager(
   new PostManager(),
   new t2()
);
