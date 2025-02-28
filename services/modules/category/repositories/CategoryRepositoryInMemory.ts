import { ICategory } from "../entities/category";
import { ICategoryManager } from "./category-repository";

export class CategoryRepositoryInMemory implements ICategoryManager {
   private categories: ICategory[] = [];

   constructor() {
      // Criar algumas categorias de exemplo
      for (let i = 1; i <= 20; i++) {
         this.categories.push({
            id: `category-${i}`,
            name: `Categoria ${i}`,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
         });
      }
   }

   async create(category: ICategory): Promise<void> {
      this.categories.push(category);
   }

   async findPopularCategories(limit: number = 5): Promise<ICategory[]> {
      return this.categories
         .sort((a, b) => (b.posts?.length || 0) - (a.posts?.length || 0))
         .slice(0, limit);
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ categories: ICategory[]; total: number }> {
      const start = (page - 1) * limit;
      const end = start + limit;
      return {
         categories: this.categories.slice(start, end),
         total: this.categories.length,
      };
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
