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

class ApiManager {
   constructor(
      public readonly post: IPostRepository,
      public readonly category: ICategoryManager,
      public readonly user: IUserRepository,
      public readonly comment: ICommentRepository,
      public readonly role: IRoleRepository
   ) {}
}

export const apiManager = new ApiManager(
   new PostRepositoryInMemory(),
   new CategoryRepositoryInMemory(),
   new UserRepositoryInMemory(),
   new CommentRepositoryInMemory(),
   new RoleRepositoryInMemory()
);
