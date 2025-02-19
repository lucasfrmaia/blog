import { IPost } from "../entities/Post";
import { IPostRepository } from "./PostRepository";

export class PostRepositoryInMemory implements IPostRepository {
   async getLastPost(): Promise<IPost> {
      return {
         id: "123e4567-e89b-12d3-a456-426614174000",
         createdAt: new Date(),
         updateAt: new Date(),
         slug: "my-first-post",
         title: "My First Post Title",
         description: "This is the description of my first post.",
         img: "https://buffer.com/resources/content/images/2024/09/best-time-to-post-on-Facbeook.png",
         views: 100,
         catSlug: "technology",
         userEmail: "john.doe@example.com",
         categories: [],
      };
   }
   private posts: IPost[] = [];

   constructor() {
      this.posts = Array.from({ length: 10 }).map((x) => {
         return {
            id: `123e4567-e89b-12d3-a456-${~~(Math.random() * 1_000_000_000)}`,
            createdAt: new Date(),
            updateAt: new Date(),
            slug: "my-first-post",
            title: "My First Post Title",
            description: "This is the description of my first post.",
            img: "https://buffer.com/resources/content/images/2024/09/best-time-to-post-on-Facbeook.png",
            views: 100,
            catSlug: "technology",
            userEmail: "john.doe@example.com",
            categories: [],
         };
      });
   }

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
      return this.posts;
   }

   async findPerPage(data: {
      amountPerPage: number;
      page: number;
   }): Promise<IPost[]> {
      const { amountPerPage, page } = data;
      return this.posts.slice((page - 1) * amountPerPage, page * amountPerPage);
   }

   async findPopular(amount: number): Promise<IPost[]> {
      return Array.from({ length: amount }).map((x) => {
         return {
            id: `123e4567-e89b-12d3-a456-426614174000 ${Math.random()}`,
            createdAt: new Date(),
            updateAt: new Date(),
            slug: "my-first-post",
            title: "Popular Post",
            description: "This is the description of my first post.",
            img: "https://buffer.com/resources/content/images/2024/09/best-time-to-post-on-Facbeook.png",
            views: 100,
            catSlug: "technology",
            userEmail: "john.doe@example.com",
            categories: [],
         };
      });
   }

   async delete(id: string): Promise<void> {
      this.posts = this.posts.filter((p) => p.id !== id);
   }
}
