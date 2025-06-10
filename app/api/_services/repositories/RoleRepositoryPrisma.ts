import { IRoleRepository } from '../interfaces/RoleRepository';
import { IRole, IRoleCreate, IRoleUpdate } from '../entities/role';
import { prisma } from '../../../../prisma/lib/prisma';

export class RoleRepositoryPrisma implements IRoleRepository {
   async create(data: IRoleCreate): Promise<IRole> {
      const role = await prisma.role.create({
         data: {
            name: data.name,
            description: data.description || '',
         },
         include: { users: true },
      });

      return role;
   }

   async update(data: IRoleUpdate): Promise<void> {
      await prisma.role.update({
         where: { id: data.id },
         data: {
            name: data.name,
            description: data.description,
         },
         include: { users: true },
      });
   }

   async delete(id: number): Promise<void> {
      const usersWithRole = await prisma.user.findMany({
         where: { roleId: id },
      });

      if (usersWithRole.length > 0) {
         throw new Error(
            `Não é possível deletar a role ${id} pois está associada a ${usersWithRole.length} usuário(s).`,
         );
      }

      await prisma.role.delete({ where: { id } });
   }

   async findAll(): Promise<IRole[]> {
      const roles = await prisma.role.findMany({
         include: {
            users: true,
         },
      });
      return roles;
   }

   async findById(id: number): Promise<IRole | null> {
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
      limit: number,
   ): Promise<{ roles: IRole[]; total: number }> {
      const [roles, total] = await Promise.all([
         prisma.role.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
               users: true,
            },
            orderBy: {
               name: 'asc',
            },
         }),
         prisma.role.count(),
      ]);

      return { roles: roles as IRole[], total };
   }
}
