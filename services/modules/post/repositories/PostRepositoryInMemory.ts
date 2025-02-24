import { IPost, IPostCreate, IPostUpdate } from "../entities/Post";
import { IPostRepository } from "./PostRepository";

export class PostRepositoryInMemory implements IPostRepository {
   private posts: IPost[] = [];

   async getLastPost(): Promise<IPost> {
      return {
         ...this.posts[0],
         id: "123e4567-e89b-12d3-a456-426614174000",
      };
   }

   constructor() {
      this.posts = Array.from({ length: 10 }).map((x) => {
         return {
            id: `123e4567-e89b-12d3-a456-${~~(Math.random() * 1_000_000_000)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            slug: "my-first-post",
            title: "My First Post Title",
            description: "This is the description of my first post.",
            content: "This is the content of my first post.",
            authorId: "123e4567-e89b-12d3-a456-426614174000",
            img: "https://buffer.com/resources/content/images/2024/09/best-time-to-post-on-Facbeook.png",
            views: 100,
            catSlug: "technology",
            userEmail: "john.doe@example.com",
            categories: [],
         };
      });
   }

   async findByCategory(categoryId: string): Promise<IPost[]> {
      return this.posts.filter((p) =>
         p.category?.some((c) => c.id === categoryId)
      );
   }

   async findPerPage(page: number, limit: number): Promise<IPost[]> {
      return this.posts.slice((page - 1) * limit, page * limit);
   }

   async create(post: IPostCreate): Promise<void> {
      this.posts.push({} as IPost);
   }

   async update(post: IPostUpdate): Promise<void> {
      const index = this.posts.findIndex((p) => p.id === post.id);

      if (index !== -1) {
         this.posts[index] = {
            ...this.posts[index],
            ...post,
         };
      }
   }

   async findById(id: string): Promise<IPost | null> {
      const post = this.posts.find((p) => p.id === id);
      return post || null;
   }

   async findAll(): Promise<IPost[]> {
      return this.posts;
   }

   async findPopular(amount: number): Promise<IPost[]> {
      return this.posts.slice(0, amount);
   }

   async delete(id: string): Promise<void> {
      this.posts = this.posts.filter((p) => p.id !== id);
   }
}
