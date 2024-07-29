import { ICategoryManager } from "./category/repositories/category-repository";
import { IPostRepository } from "./post/repositories/PostRepository";
import { ICategory } from "./category/entities/category";
import { IPost } from "./post/entities/Post";
import { IUserRepository } from "./user/repositories/UserRepository";
import { IUser } from "./user/entities/user";
import { PostRepositoryInMemory } from "./post/repositories/PostRepositoryInMemory";

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
   async findAll(): Promise<ICategory[]> {
      return [];
   }
   delete(id: string): Promise<void> {
      throw new Error("Method not implemented.");
   }
}

class t3 implements IUserRepository {
   authenticate(email?: string, password?: string): Promise<IUser> {
      throw new Error("Method not implemented.");
   }
   create(user: IUser): Promise<void> {
      throw new Error("Method not implemented.");
   }
}

class RandomApiManager {
   constructor(
      public readonly post: IPostRepository,
      public readonly category: ICategoryManager,
      public readonly user: IUserRepository
   ) {}
}

export const randomApiManager = new RandomApiManager(
   new PostRepositoryInMemory(),
   new t2(),
   new t3()
);
