import { prisma } from "../../../../../../prisma/lib/prisma";
import { IPost, IPostCreate, IPostUpdate } from "../entities/Post";
import { IPostRepository } from "./PostRepository";

export class PostRepositoryPrisma implements IPostRepository {
   async create(data: IPostCreate): Promise<void> {
      const { categoryId, ...postData } = data;
      await prisma.post.create({
         data: {
            ...postData,
            ...(categoryId && { categoryId }),
         },
      });
   }

   async update(data: IPostUpdate): Promise<void> {
      const { categoryId, ...postData } = data;
      await prisma.post.update({
         where: { id: data.id },
         data: {
            ...postData,
            ...(categoryId && { categoryId }),
         },
      });
   }

   async findById(id: string): Promise<IPost | null> {
      const post = await prisma.post.findUnique({
         where: { id },
         include: {
            author: true,
            comments: true,
            category: true,
         },
      });

      return post as IPost | null;
   }

   async findAll(limit?: number): Promise<IPost[]> {
      const posts = await prisma.post.findMany({
         take: limit,
         include: {
            author: true,
            comments: true,
            category: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      return posts as IPost[];
   }

   async delete(id: string): Promise<void> {
      await prisma.post.delete({
         where: { id },
      });
   }

   async findByCategory(categoryId: string): Promise<IPost[]> {
      const posts = await prisma.post.findMany({
         where: {
            category: {},
         },
         include: {
            author: true,
            comments: true,
            category: true,
         },
      });

      return posts as IPost[];
   }

   async findPopular(limit: number = 5): Promise<IPost[]> {
      const posts = await prisma.post.findMany({
         take: limit,
         include: {
            author: true,
            comments: true,
            category: true,
         },
         orderBy: {
            comments: {
               _count: "desc",
            },
         },
      });

      return posts as IPost[];
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ posts: IPost[]; total: number }> {
      const skip = (page - 1) * limit;

      const [posts, total] = await Promise.all([
         prisma.post.findMany({
            skip,
            take: limit,
            include: {
               author: true,
               comments: true,
               category: true,
            },
            orderBy: {
               createdAt: "desc",
            },
         }),
         prisma.post.count(),
      ]);

      return {
         posts,
         total,
      };
   }

   async getLastPost(): Promise<IPost | null> {
      const post = await prisma.post.findFirst({
         include: {
            author: true,
            comments: true,
            category: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      return post as IPost | null;
   }
}
