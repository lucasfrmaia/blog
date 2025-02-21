import {
   ICategory,
   ICategoryCreate,
   ICategoryUpdate,
} from "../entities/category";

export interface ICategoryManager {
   create(data: ICategoryCreate): Promise<void>;
   update(data: ICategoryUpdate): Promise<void>;
   findById(id: number): Promise<ICategory | null>;
   findAll(): Promise<ICategory[]>;
   delete(id: number): Promise<void>;
   findPopularCategories(limit?: number): Promise<ICategory[]>;
}
