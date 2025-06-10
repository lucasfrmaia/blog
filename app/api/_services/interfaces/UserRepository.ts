import { IUser, IUserCreate, IUserUpdate } from '../entities/user';
import { IBaseRepository } from './BaseRepository';

export interface IUserRepository
   extends IBaseRepository<IUser, IUserCreate, IUserUpdate> {
   findByEmail(email: string): Promise<IUser | null>;
   findByRoleId(roleId: number): Promise<IUser[]>;
   findPerPage(
      page: number,
      limit: number,
   ): Promise<{ users: IUser[]; total: number }>;
   authenticate(email: string, password: string): Promise<IUser>;
}
