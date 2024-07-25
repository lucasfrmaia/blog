import { IPost } from "@/app/(entities)/interfaces";
import { ICategoryManager } from "./category/repositories/category-repository";
import { IPostManager } from "./post/repositories/post-repository";
import { ICategory } from "./category/entities/category";

class t1 implements IPostManager {
   create(note: IPost): Promise<void> {
      throw new Error("Method not implemented.");
   }
   update(post: IPost): Promise<void> {
      throw new Error("Method not implemented.");
   }
   findById(id: string): Promise<IPost | null> {
      throw new Error("Method not implemented.");
   }
   findAll(): Promise<IPost[]> {
      throw new Error("Method not implemented.");
   }
   delete(id: string): Promise<void> {
      throw new Error("Method not implemented.");
   }
}

class t2 implements ICategoryManager {
   create(note: ICategory): Promise<void> {
      throw new Error("Method not implemented.");
   }
   update(category: ICategory): Promise<void> {
      throw new Error("Method not implemented.");
   }
   findById(id: string): Promise<ICategory | null> {
      throw new Error("Method not implemented.");
   }
   findAll(): Promise<ICategory[]> {
      throw new Error("Method not implemented.");
   }
   delete(id: string): Promise<void> {
      throw new Error("Method not implemented.");
   }
}

class RandomApiManager {
   constructor(
      public readonly post: IPostManager,
      public readonly category: ICategoryManager
   ) {}
}

export const randomApiManager = new RandomApiManager(new t1(), new t2());
