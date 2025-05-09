import { IPost, IPostCreate, IPostUpdate } from "../entities/Post";
import { IPostRepository } from "./PostRepository";

export class PostRepositoryInMemory implements IPostRepository {
   private posts: IPost[] = [];

   async getLastPost(): Promise<IPost | null> {
      if (this.posts.length === 0) return null;
      return this.posts[this.posts.length - 1];
   }

   constructor() {
      // Criar alguns posts de exemplo
      for (let i = 1; i <= 20; i++) {
         this.posts.push({
            id: `post-${i}`,
            title: `Post ${i}`,
            img: `https://picsum.photos/200/300?random=${i}`,
            description: `Descrição do post ${i}`,
            content: `Conteúdo do post ${i}`,
            authorId: "1",
            views: Math.floor(Math.random() * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            categories: [
               {
                  id: "1",
                  name: "Categoria 1",
                  color: "#000000",
               },
            ],
         });
      }
   }

   async findByCategory(categoryId: string): Promise<IPost[]> {
      return this.posts.filter((post) =>
         post.categories?.some((cat) => cat.id === categoryId)
      );
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ posts: IPost[]; total: number }> {
      const start = (page - 1) * limit;
      const end = start + limit;
      return {
         posts: this.posts.slice(start, end),
         total: this.posts.length,
      };
   }

   async create(post: IPostCreate): Promise<void> {
      this.posts.push({
         ...post,
         id: "123",
         createdAt: new Date(),
         updatedAt: new Date(),
         views: 0,
      });
   }

   async update(post: IPostUpdate): Promise<void> {
      const index = this.posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
         this.posts[index] = {
            ...this.posts[index],
            ...post,
            updatedAt: new Date(),
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

   async findPopular(amount: number = 5): Promise<IPost[]> {
      return this.posts
         .sort((a, b) => (b.views || 0) - (a.views || 0))
         .slice(0, amount);
   }

   async delete(id: string): Promise<void> {
      this.posts = this.posts.filter((p) => p.id !== id);
   }
}
