import { IRole, IRoleCreate, IRoleUpdate } from "../entities/role";
import { IRoleRepository } from "./RoleRepository";

export class RoleRepositoryInMemory implements IRoleRepository {
   private roles: IRole[] = [
      {
         id: "1",
         name: "Admin",
         description: "Administrador do sistema",
         createdAt: new Date(),
         updatedAt: new Date(),
      },
      {
         id: "2",
         name: "Editor",
         description: "Editor de conteúdo",
         createdAt: new Date(),
         updatedAt: new Date(),
      },
      {
         id: "3",
         name: "Author",
         description: "Autor de posts",
         createdAt: new Date(),
         updatedAt: new Date(),
      },
   ];

   async create(data: IRoleCreate): Promise<IRole> {
      const newRole: IRole = {
         id: Math.random().toString(36).substring(2, 9),
         name: data.name,
         description: data.description,
         createdAt: new Date(),
         updatedAt: new Date(),
      };

      this.roles.push(newRole);
      return newRole;
   }

   async update(data: IRoleUpdate): Promise<void> {
      const index = this.roles.findIndex((role) => role.id === data.id);
      if (index !== -1) {
         this.roles[index] = {
            ...this.roles[index],
            ...data,
            updatedAt: new Date(),
         };
      }
   }

   async delete(id: string): Promise<void> {
      this.roles = this.roles.filter((role) => role.id !== id);
   }

   async findByUserId(userId: string): Promise<IRole | null> {
      // Simulando a relação entre usuário e role
      // Em um caso real, teríamos uma lista de usuários com suas roles
      const roleIndex = parseInt(userId) % this.roles.length;
      return this.roles[roleIndex] || null;
   }

   async findAll(): Promise<IRole[]> {
      return this.roles;
   }

   async findById(id: string): Promise<IRole | null> {
      const role = this.roles.find((role) => role.id === id);
      return role || null;
   }

   async findByName(name: string): Promise<IRole | null> {
      const role = this.roles.find((role) => role.name === name);
      return role || null;
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ roles: IRole[]; total: number }> {
      const start = (page - 1) * limit;
      const end = start + limit;
      const roles = this.roles.slice(start, end);
      return {
         roles,
         total: this.roles.length,
      };
   }
}
