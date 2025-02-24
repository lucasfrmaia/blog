import { ICategory } from "../entities/category";
import { ICategoryManager } from "./category-repository";

export class CategoryRepositoryInMemory implements ICategoryManager {
   private categories: ICategory[] = [];

   async create(category: ICategory): Promise<void> {
      this.categories.push(category);
   }

   async findPopularCategories(limit?: number): Promise<ICategory[]> {
      return this.categories.slice(0, limit);
   }

   async update(category: ICategory): Promise<void> {
      const index = this.categories.findIndex((c) => c.id === category.id);
      if (index !== -1) {
         this.categories[index] = category;
      }
   }

   async findById(id: string): Promise<ICategory | null> {
      const category = this.categories.find((c) => c.id === id);
      return category || null;
   }

   async findAll(): Promise<ICategory[]> {
      return this.categories;
   }

   async delete(id: string): Promise<void> {
      this.categories = this.categories.filter((c) => c.id !== id);
   }
}
