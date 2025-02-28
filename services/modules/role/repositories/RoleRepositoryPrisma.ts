import { prisma } from "@/services/lib/prisma";
import { IRoleRepository } from "./RoleRepository";
import { IRole } from "../entities/role";

export class RoleRepositoryPrisma implements IRoleRepository {
   async findAll(): Promise<IRole[]> {
      const roles = await prisma.role.findMany();
      return roles.map((role: IRole) => ({
         id: role.id,
         name: role.name,
         description: role.description,
         createdAt: role.createdAt,
         updatedAt: role.updatedAt,
      }));
   }

   async findById(id: string): Promise<IRole | null> {
      const role = await prisma.role.findUnique({
         where: { id },
      });

      if (!role) return null;

      return {
         id: role.id,
         name: role.name,
         description: role.description,
         createdAt: role.createdAt,
         updatedAt: role.updatedAt,
      };
   }

   async findByName(name: string): Promise<IRole | null> {
      const role = await prisma.role.findFirst({
         where: { name },
      });

      if (!role) return null;

      return {
         id: role.id,
         name: role.name,
         description: role.description,
         createdAt: role.createdAt,
         updatedAt: role.updatedAt,
      };
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ roles: IRole[]; total: number }> {
      const [roles, total] = await Promise.all([
         prisma.role.findMany({
            skip: (page - 1) * limit,
            take: limit,
         }),
         prisma.role.count(),
      ]);

      return {
         roles: roles.map((role: IRole) => ({
            id: role.id,
            name: role.name,
            description: role.description,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
         })),
         total,
      };
   }
}
