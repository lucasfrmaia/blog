import {
   IPost,
   IPostCreate,
   IPostFilters,
   IPostUpdate,
} from "../entities/Post";

export interface IPostRepository {
   create(data: IPostCreate): Promise<void>;
   update(data: IPostUpdate): Promise<void>;
   findById(id: string): Promise<IPost | null>;
   findAll(): Promise<IPost[]>;
   delete(id: string): Promise<void>;
   findByCategory(categoryId: string): Promise<IPost[]>;
   findPopular(limit?: number): Promise<IPost[]>;
   findPerPage(
      page: number,
      limit: number,
      filters?: IPostFilters
   ): Promise<{ posts: IPost[]; total: number }>;
   getLastPost(): Promise<IPost | null>;
}
