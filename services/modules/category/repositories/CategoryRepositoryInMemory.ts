import { ICategory } from "../entities/category";
import { ICategoryManager } from "./category-repository";

export class CategoryRepositoryInMemory implements ICategoryManager {
   private categories: ICategory[] = [];

   constructor() {
      this.categories = Array.from({ length: 10 }, (_, index) => ({
         id: `category-${index + 1}`,
         name: `Category ${index + 1}`,
         color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
         createdAt: new Date(),
         updatedAt: new Date(),
      }));
   }

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
