import {
   ICategory,
   ICategoryCreate,
   ICategoryUpdate,
} from "../entities/category";
import { IBaseRepository } from "./BaseRepository";

export interface ICategoryRepository
   extends IBaseRepository<ICategory, ICategoryCreate, ICategoryUpdate> {
   findByPostId(postId: string): Promise<ICategory[]>;
   findPopularCategories(limit?: number): Promise<ICategory[]>;
   findPerPage(
      page: number,
      limit: number
   ): Promise<{ categories: ICategory[]; total: number }>;
}
