import { prisma } from "@/services/lib/prisma";
import {
   ICategory,
   ICategoryCreate,
   ICategoryUpdate,
} from "../entities/category";
import { ICategoryManager } from "./category-repository";

export class CategoryRepositoryPrisma implements ICategoryManager {
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

   async findById(id: number): Promise<ICategory | null> {
      const category = await prisma.category.findUnique({
         where: { id },
         include: {
            posts: true,
         },
      });

      if (!category) return null;

      return {
         id: category.id,
         name: category.name,
         color: category.color,
      };
   }

   async findAll(): Promise<ICategory[]> {
      const categories = await prisma.category.findMany();

      return categories.map((category) => ({
         id: category.id,
         name: category.name,
         color: category.color,
      }));
   }

   async delete(id: number): Promise<void> {
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

      return categories.map((category) => ({
         id: category.id,
         name: category.name,
         color: category.color,
         posts: category.posts,
      }));
   }
}
