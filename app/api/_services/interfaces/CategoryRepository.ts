import {
   ICategory,
   ICategoryCreate,
   ICategoryUpdate,
} from "../entities/category";

export interface ICategoryRepository {
   create(data: ICategoryCreate): Promise<void>;
   update(data: ICategoryUpdate): Promise<void>;
   findById(id: string): Promise<ICategory | null>;
   findAll(): Promise<ICategory[]>;
   delete(id: string): Promise<void>;
   findByPostId(postId: string): Promise<ICategory[]>;
   findPopularCategories(limit?: number): Promise<ICategory[]>;
   findPerPage(
      page: number,
      limit: number
   ): Promise<{ categories: ICategory[]; total: number }>;
}
