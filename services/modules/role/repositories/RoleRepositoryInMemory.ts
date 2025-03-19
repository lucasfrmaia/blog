import { IRole } from "../entities/role";
import { IRoleRepository } from "./RoleRepository";

export class RoleRepositoryInMemory implements IRoleRepository {
   findByUserId(userId: string): Promise<IRole | null> {
      throw new Error("Method not implemented.");
   }
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
