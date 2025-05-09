import { UserRepositoryPrisma } from "./user/repositories/UserRepositoryPrisma";
import { PostRepositoryPrisma } from "./post/repositories/PostRepositoryPrisma";
import { CategoryRepositoryPrisma } from "./category/repositories/CategoryRepositoryPrisma";
import { CommentRepositoryPrisma } from "./comment/repositories/CommentRepositoryPrisma";

export const makeUserRepository = () => {
   return new UserRepositoryPrisma();
};

export const makePostRepository = () => {
   return new PostRepositoryPrisma();
};

export const makeCategoryRepository = () => {
   return new CategoryRepositoryPrisma();
};

export const makeCommentRepository = () => {
   return new CommentRepositoryPrisma();
};
