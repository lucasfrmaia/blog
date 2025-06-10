import { prisma } from '../../../../prisma/lib/prisma';
import {
   IPost,
   IPostCreate,
   IPostFilters,
   IPostUpdate,
} from '../entities/Post';
import { Prisma } from '@prisma/client';
import { IPostRepository } from '../interfaces/PostRepository';

export class PostRepositoryPrisma implements IPostRepository {
   async create(data: IPostCreate): Promise<IPost> {
      const { categories, ...postData } = data;
      return await prisma.post.create({
         data: {
            ...postData,
            categories: {
               connect: categories.map((id) => ({ id })),
            },
         },
      });
   }

   async update(data: IPostUpdate): Promise<void> {
      const { id, categories, ...postData } = data;
      await prisma.post.update({
         where: { id },
         data: {
            ...postData,
            categories: {
               set: categories?.map((id) => ({ id })) || [],
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

   async findAll(): Promise<IPost[]> {
      const posts = await prisma.post.findMany({
         include: {
            author: true,
            comments: true,
            categories: true,
         },
         orderBy: {
            createdAt: 'desc',
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
            categories: {
               some: {
                  id: categoryId,
               },
            },
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
            views: 'desc',
         },
      });

      return posts as IPost[];
   }

   async findPerPage(
      page: number,
      limit: number,
      filters?: IPostFilters,
   ): Promise<{ posts: IPost[]; total: number }> {
      const skip = (page - 1) * limit;

      const where = {
         AND: [
            filters?.search
               ? {
                    OR: [
                       {
                          title: {
                             contains: filters.search,
                          },
                       },
                       {
                          description: {
                             contains: filters.search,
                          },
                       },
                    ],
                 }
               : {},
            filters?.categories && filters.categories.length > 0
               ? {
                    categories: {
                       some: {
                          id: {
                             in: filters.categories,
                          },
                       },
                    },
                 }
               : {},
         ],
      };

      const orderBy: Prisma.PostOrderByWithRelationInput =
         filters?.sortBy === 'oldest'
            ? { createdAt: 'asc' }
            : filters?.sortBy === 'popular'
              ? { views: 'desc' }
              : { createdAt: 'desc' };

      const [posts, total] = await Promise.all([
         prisma.post.findMany({
            skip,
            take: limit,
            where,
            orderBy,
            include: {
               author: true,
               comments: true,
               categories: true,
            },
         }),
         prisma.post.count({ where }),
      ]);

      return {
         posts: posts as IPost[],
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
            createdAt: 'desc',
         },
      });

      return post as IPost | null;
   }
}
