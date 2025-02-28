import { prisma } from "@/services/lib/prisma";
import {
   ICategory,
   ICategoryCreate,
   ICategoryUpdate,
} from "../entities/category";
import { ICategoryManager } from "./category-repository";

export class CategoryRepositoryPrisma implements ICategoryManager {
   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ categories: ICategory[]; total: number }> {
      throw new Error("Method not implemented.");
   }

   async create(data: ICategoryCreate): Promise<void> {
      await prisma.category.create({
         data: {
            name: data.name,
            color: data.color,
         },
      });
   }

   async update(data: ICategoryUpdate): Promise<void> {
      await prisma.category.update({
         where: { id: data.id },
         data: {
            name: data.name,
            color: data.color,
         },
      });
   }

   async findById(id: string): Promise<ICategory | null> {
      const category = await prisma.category.findUnique({
         where: { id },
         include: {
            posts: true,
         },
      });

      return category;
   }

   async findAll(): Promise<ICategory[]> {
      const categories = await prisma.category.findMany({
         include: {
            posts: true,
         },
      });

      return categories;
   }

   async delete(id: string): Promise<void> {
      await prisma.category.delete({
         where: { id },
      });
   }

   async findPopularCategories(limit: number = 5): Promise<ICategory[]> {
      const categories = await prisma.category.findMany({
         include: {
            posts: true,
         },
         orderBy: {
            posts: {
               _count: "desc",
            },
         },
         take: limit,
      });

      return categories;
   }
}
