import { IRole, IRoleCreate, IRoleUpdate } from '../entities/role';
import { IBaseRepository } from './BaseRepository';

export interface IRoleRepository
   extends IBaseRepository<IRole, IRoleCreate, IRoleUpdate> {
   findByName(name: string): Promise<IRole | null>;
   findByUserId(userId: string): Promise<IRole | null>;
   findPerPage(
      page: number,
      limit: number,
   ): Promise<{ roles: IRole[]; total: number }>;
}
