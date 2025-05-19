import { prisma } from "../../../../../../prisma/lib/prisma";
import { IPost, IPostCreate, IPostUpdate } from "../entities/Post";
import { IPostRepository } from "./PostRepository";

export class PostRepositoryPrisma implements IPostRepository {
   async create(data: IPostCreate): Promise<void> {
      const { categories, ...postData } = data;
      await prisma.post.create({
         data: {
            ...postData,
            categories: {
               connect: categories.map((id) => ({ id })),
            },
         },
      });
   }

   async update(data: IPostUpdate): Promise<void> {
      const { categories, ...postData } = data;
      await prisma.post.update({
         where: { id: data.id },
         data: {
            ...postData,
            categories: {
               connect: categories?.map((id) => ({ id })),
            },
         },
      });
   }

   async findById(id: string): Promise<IPost | null> {
      const post = await prisma.post.findUnique({
         where: { id },
         include: {
            author: true,
            comments: true,
            categories: true,
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
            categories: true,
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
            categories: {},
         },
         include: {
            author: true,
            comments: true,
            categories: true,
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
            categories: true,
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
               categories: true,
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
            categories: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      return post as IPost | null;
   }
}
