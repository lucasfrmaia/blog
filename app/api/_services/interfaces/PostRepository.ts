import {
   IPost,
   IPostCreate,
   IPostFilters,
   IPostUpdate,
} from "../entities/Post";
import { IBaseRepository } from "./BaseRepository";

export interface IPostRepository
   extends IBaseRepository<IPost, IPostCreate, IPostUpdate> {
   findByCategory(categoryId: string): Promise<IPost[]>;
   findPopular(limit?: number): Promise<IPost[]>;
   findPerPage(
      page: number,
      limit: number,
      filters?: IPostFilters
   ): Promise<{ posts: IPost[]; total: number }>;
   getLastPost(): Promise<IPost | null>;
}
