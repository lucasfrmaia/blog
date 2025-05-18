import { IRole, IRoleCreate, IRoleUpdate } from "../entities/role";

export interface IRoleRepository {
   create(data: IRoleCreate): Promise<IRole>;
   update(data: IRoleUpdate): Promise<void>;
   delete(id: number): Promise<void>;
   findAll(): Promise<IRole[]>;
   findById(id: number): Promise<IRole | null>;
   findByName(name: string): Promise<IRole | null>;
   findByUserId(userId: string): Promise<IRole | null>;
   findPerPage(
      page: number,
      limit: number
   ): Promise<{ roles: IRole[]; total: number }>;
}
