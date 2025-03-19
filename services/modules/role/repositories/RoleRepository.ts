import { IRole } from "../entities/role";

export interface IRoleRepository {
   findAll(): Promise<IRole[]>;
   findById(id: string): Promise<IRole | null>;
   findByName(name: string): Promise<IRole | null>;
   findByUserId(userId: string): Promise<IRole | null>;
   findPerPage(
      page: number,
      limit: number
   ): Promise<{ roles: IRole[]; total: number }>;
}
