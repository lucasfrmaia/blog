import { prisma } from "@/services/lib/prisma";
import { IRoleRepository } from "./RoleRepository";
import { IRole } from "../entities/role";

export class RoleRepositoryPrisma implements IRoleRepository {
   async findAll(): Promise<IRole[]> {
      const roles = await prisma.role.findMany({
         include: {
            users: true,
         },
      });
      return roles;
   }

   async findById(id: string): Promise<IRole | null> {
      const role = await prisma.role.findUnique({
         where: { id },
         include: {
            users: true,
         },
      });

      return role;
   }

   async findByName(name: string): Promise<IRole | null> {
      const role = await prisma.role.findFirst({
         where: { name },
         include: {
            users: true,
         },
      });

      return role;
   }

   async findByUserId(userId: string): Promise<IRole | null> {
      const role = await prisma.role.findFirst({
         where: {
            users: {
               some: {
                  id: userId,
               },
            },
         },
         include: {
            users: true,
         },
      });

      return role;
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ roles: IRole[]; total: number }> {
      const [roles, total] = await Promise.all([
         prisma.role.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
               users: true,
            },
            orderBy: {
               name: "asc",
            },
         }),
         prisma.role.count(),
      ]);

      return { roles, total };
   }
}
