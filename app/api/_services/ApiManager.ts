import { ICategoryRepository } from './interfaces/CategoryRepository';
import { ICommentRepository } from './interfaces/CommentRepository';
import { IPostRepository } from './interfaces/PostRepository';
import { IRoleRepository } from './interfaces/RoleRepository';
import { IUserRepository } from './interfaces/UserRepository';
import { CategoryRepositoryPrisma } from './repositories/CategoryRepositoryPrisma';
import { CommentRepositoryPrisma } from './repositories/CommentRepositoryPrisma';
import { PostRepositoryPrisma } from './repositories/PostRepositoryPrisma';
import { RoleRepositoryPrisma } from './repositories/RoleRepositoryPrisma';
import { UserRepositoryPrisma } from './repositories/UserRepositoryPrisma';

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
      public readonly category: ICategoryRepository,
      public readonly user: IUserRepository,
      public readonly comment: ICommentRepository,
      public readonly role: IRoleRepository,
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
            currentRepository.role,
         );
      }
      return ApiManager.instance;
   }
}

export const apiManager = ApiManager.getInstance();
