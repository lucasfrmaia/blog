import { ICategoryManager } from "./category/repositories/category-repository";
import { IPostRepository } from "./post/repositories/PostRepository";
import { IUserRepository } from "./user/repositories/UserRepository";
import { ICommentRepository } from "./comment/repositories/CommentRepository";
import { UserRepositoryPrisma } from "./user/repositories/UserRepositoryPrisma";
import { PostRepositoryPrisma } from "./post/repositories/PostRepositoryPrisma";
import { CategoryRepositoryPrisma } from "./category/repositories/CategoryRepositoryPrisma";
import { CommentRepositoryPrisma } from "./comment/repositories/CommentRepositoryPrisma";
import { PostRepositoryInMemory } from "./post/repositories/PostRepositoryInMemory";
import { CategoryRepositoryInMemory } from "./category/repositories/CategoryRepositoryInMemory";
import { UserRepositoryInMemory } from "./user/repositories/UserRepositoryInMemory";
import { CommentRepositoryInMemory } from "./comment/repositories/CommentRepositoryInMemory";
import { IRoleRepository } from "./role/repositories/RoleRepository";
import { RoleRepositoryInMemory } from "./role/repositories/RoleRepositoryInMemory";

// Singleton para manter os repositórios em memória
const inMemoryRepositories = {
   post: new PostRepositoryInMemory(),
   category: new CategoryRepositoryInMemory(),
   user: new UserRepositoryInMemory(),
   comment: new CommentRepositoryInMemory(),
   role: new RoleRepositoryInMemory(),
};

class ApiManager {
   constructor(
      public readonly post: IPostRepository,
      public readonly category: ICategoryManager,
      public readonly user: IUserRepository,
      public readonly comment: ICommentRepository,
      public readonly role: IRoleRepository
   ) {}

   private static instance: ApiManager | null = null;

   public static getInstance(): ApiManager {
      if (!ApiManager.instance) {
         ApiManager.instance = new ApiManager(
            inMemoryRepositories.post,
            inMemoryRepositories.category,
            inMemoryRepositories.user,
            inMemoryRepositories.comment,
            inMemoryRepositories.role
         );
      }
      return ApiManager.instance;
   }
}

export const apiManager = ApiManager.getInstance();
