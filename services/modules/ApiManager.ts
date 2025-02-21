import { ICategoryManager } from "./category/repositories/category-repository";
import { IPostRepository } from "./post/repositories/PostRepository";
import { IUserRepository } from "./user/repositories/UserRepository";
import { ICommentRepository } from "./comment/repositories/CommentRepository";
import { UserRepositoryPrisma } from "./user/repositories/UserRepositoryPrisma";
import { PostRepositoryPrisma } from "./post/repositories/PostRepositoryPrisma";
import { CategoryRepositoryPrisma } from "./category/repositories/CategoryRepositoryPrisma";
import { CommentRepositoryPrisma } from "./comment/repositories/CommentRepositoryPrisma";

class ApiManager {
   constructor(
      public readonly post: IPostRepository,
      public readonly category: ICategoryManager,
      public readonly user: IUserRepository,
      public readonly comment: ICommentRepository
   ) {}
}

export const apiManager = new ApiManager(
   new PostRepositoryPrisma(),
   new CategoryRepositoryPrisma(),
   new UserRepositoryPrisma(),
   new CommentRepositoryPrisma()
);
