import { IPost, IPostCreate, IPostUpdate } from "../entities/Post";

export interface IPostRepository {
   create(data: IPostCreate): Promise<void>;
   update(data: IPostUpdate): Promise<void>;
   findById(id: number): Promise<IPost | null>;
   findAll(limit?: number): Promise<IPost[]>;
   delete(id: number): Promise<void>;
   findByCategory(categoryId: number): Promise<IPost[]>;
   findPopular(limit?: number): Promise<IPost[]>;
   findPerPage(
      page: number,
      limit: number
   ): Promise<{
      posts: IPost[];
      total: number;
   }>;
   getLastPost(): Promise<IPost | null>;
}
