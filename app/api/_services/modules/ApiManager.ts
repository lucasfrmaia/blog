import { ICategoryManager } from "./category/repositories/category-repository";
import { IPostRepository } from "./post/repositories/PostRepository";
import { IUserRepository } from "./user/repositories/UserRepository";
import { ICommentRepository } from "./comment/repositories/CommentRepository";

import { PostRepositoryPrisma } from "./post/repositories/PostRepositoryPrisma";
import { CategoryRepositoryPrisma } from "./category/repositories/CategoryRepositoryPrisma";
import { CommentRepositoryPrisma } from "./comment/repositories/CommentRepositoryPrisma";
import { IRoleRepository } from "./role/repositories/RoleRepository";
import { RoleRepositoryPrisma } from "./role/repositories/RoleRepositoryPrisma";

import { UserRepositoryPrisma } from "./user/repositories/UserRepositoryPrisma";

// Singleton para manter os repositórios em memória
const prismaRepository = {
   post: new PostRepositoryPrisma(),
   category: new CategoryRepositoryPrisma(),
   user: new UserRepositoryPrisma(),
   comment: new CommentRepositoryPrisma(),
   role: new RoleRepositoryPrisma(),
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
         const currentRepository = prismaRepository;

         ApiManager.instance = new ApiManager(
            currentRepository.post,
            currentRepository.category,
            currentRepository.user,
            currentRepository.comment,
            currentRepository.role
         );
      }
      return ApiManager.instance;
   }
}

export const apiManager = ApiManager.getInstance();
